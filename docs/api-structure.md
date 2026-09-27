# API Architecture

## Overview

The application uses a two-tier API client architecture that separates browser-side and server-side concerns:

```
Component → Hook → apiClient (browser) → /api/* route.ts → serverApiClient → Backend API
                                                                          ↑
                                                              service (optional)
```

**Why two clients?** The browser cannot call the backend directly — the Next.js API routes act as a BFF (Backend for Frontend) that handles auth, env secrets, and data transformation.

**When to use a service layer:** The `_service/` folder is **optional**. Only create a service when the route needs to do transformation, aggregation, or business logic before/after calling the backend. If route.ts just passes the request straight through to `serverApiClient`, skip the service — it's unnecessary indirection.

---

## API Clients

### Client-Side: `lib/api-client.ts`

Runs in the browser. Used by React hooks to call Next.js API routes.

```ts
import { apiClient, ApiError } from '@/lib/api-client';

// GET with query params
const profile = await apiClient.get<ProfileData>('/api/pretopost', {
  params: { msisdn: '08123456789', endpoint: 'profile' },
});

// POST with body
const result = await apiClient.post<SubmitResponse>('/api/pretopost', {
  endpoint: 'submit',
  packageId: 'pkg-123',
  email: 'user@example.com',
});
```

**Features:**
- Base URL from `NEXT_PUBLIC_API_BASE_URL` env var (falls back to `window.location.origin`)
- Reads JWT from `sessionStorage` (`auth_token` key), attaches as `Authorization: Bearer <token>`
- Auto-unwraps `data` from `{ success, message, data }` envelope
- Throws `ApiError` with `status`, `message`, and full `data` on failure
- Methods: `get`, `post`, `put`, `patch`, `delete`

**Auth helpers:**
```ts
import { setAuthToken, clearAuthToken } from '@/lib/api-client';

// After login
setAuthToken(jwtToken);

// On logout
clearAuthToken();
```

### Server-Side: `lib/server-api-client.ts`

Runs in Node.js (API routes / services). Calls the actual backend API.

```ts
import { serverApiClient, ServerApiError } from '@/lib/server-api-client';

const data = await serverApiClient.get<BackendResponse>(
  `/api/v1/third-party/vqm/get-profile/${msisdn}`,
);
```

**Features:**
- Base URL from `BACKEND_API_BASE_URL` env var (required, throws if missing)
- Accepts `token` per-request (forwarded from the client via route.ts)
- `cache: 'no-store'` on all requests (no stale data)
- Same envelope unwrapping and error handling as client-side

---

## Environment Variables

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Client + Server | Base URL for Next.js API routes (client-side) |
| `BACKEND_API_BASE_URL` | Server only | Base URL for the actual backend API |

**Auth:** JWT token is stored in `sessionStorage` (key: `auth_token`), not in env vars. The client sends it via `Authorization` header, and route.ts forwards it to the backend.

---

## Auth Flow

```
1. User logs in → login hook calls setAuthToken(jwtToken)
2. Token stored in sessionStorage('auth_token')
3. apiClient reads token → sends Authorization: Bearer <token> to route.ts
4. route.ts extracts header → passes token to service
5. service passes token to serverApiClient → forwarded to backend
```

On logout, call `clearAuthToken()` to remove the token from sessionStorage.

---

## Response Envelope

All API responses follow this shape:

```ts
// Success
{ success: true, message: "success", data: T }

// Failure
{ success: false, message: "Error description", data?: unknown }
```

Both clients auto-unwrap `data` on success and throw on failure.

---

## Error Types

```ts
// Client-side (api-client.ts)
class ApiError extends Error {
  status: number;   // HTTP status code
  message: string;  // Error message from response
  data?: unknown;   // Full response body
}

// Server-side (server-api-client.ts)
class ServerApiError extends Error {
  status: number;
  message: string;
  data?: unknown;
}
```

---

## Module Structure

Each module follows this folder convention:

```
app/(main)/{module}/
├── page.tsx                    # Page component (client-side)
├── _components/                # UI components
├── _hook/                      # React hooks (call apiClient)
└── _validation/                # Zod schemas (optional)
```

The `_service/` folder is **optional** — only add it when the route needs business logic or data transformation before hitting the backend. If the route just proxies to `serverApiClient`, call it directly from route.ts.

---

## Adding a New Module

### 1. Create the API route

**Without service layer** (simple pass-through):

```ts
// app/api/mymodule/route.ts
import { NextResponse } from 'next/server';
import { serverApiClient, ServerApiError } from '@/lib/server-api-client';

function extractToken(request: Request): string | undefined {
  const auth = request.headers.get('Authorization');
  return auth?.replace('Bearer ', '') ?? undefined;
}

export async function GET(request: Request) {
  const token = extractToken(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Missing required params' },
      { status: 400 },
    );
  }

  try {
    const data = await serverApiClient.get(`/api/v1/my-endpoint/${id}`, { token });
    return NextResponse.json({ success: true, message: 'success', data });
  } catch (error) {
    if (error instanceof ServerApiError) {
      return NextResponse.json(
        { success: false, message: error.message, data: error.data },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
```

**With service layer** (when you need transformation/aggregation):

```ts
// app/(main)/mymodule/_service/mymodule.service.ts
import { serverApiClient } from '@/lib/server-api-client';

export type MyData = { /* ... */ };

export const mymoduleService = {
  getData: (id: string, token?: string) =>
    serverApiClient.get<MyData>(`/api/v1/my-endpoint/${id}`, { token }),
};
```

```ts
// app/api/mymodule/route.ts
import { mymoduleService } from '@/app/(main)/mymodule/_service/mymodule.service';
// ... same route structure, but call mymoduleService.getData() instead
```

### 2. Use in a hook

```ts
// app/(main)/mymodule/_hook/useMyData.ts
'use client';
import { useState, useEffect } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';

type MyData = { /* define inline or from a shared types file */ };

export function useMyData(id: string) {
  const [data, setData] = useState<MyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get<MyData>('/api/mymodule', {
      params: { id, endpoint: 'detail' },
    })
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Unknown error'))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, error, loading };
}
```

### 3. (Optional) Add Zod validation

```ts
// app/(main)/mymodule/_validation/mymodule.schema.ts
import { z } from 'zod';

export const mySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  email: z.string().email('Invalid email'),
});

export type MyInput = z.infer<typeof mySchema>;
```

---

## Pretopost Module Endpoints

### GET `/api/pretopost`

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `msisdn` | string | Yes | Phone number |
| `endpoint` | string | Yes | One of: `profile`, `customer-status`, `package-details`, `hlr-details`, `device-specs` |

**Response:**
```json
{
  "success": true,
  "message": "success",
  "data": { /* depends on endpoint */ }
}
```

### POST `/api/pretopost`

| Body Field | Type | Required | Description |
|------------|------|----------|-------------|
| `endpoint` | string | Yes | One of: `submit` |
| `packageId` | string | Yes | Selected package ID |
| `email` | string | Yes | Customer email |
| `phoneNumber` | string | No | Alternate phone number |

**Response (submit):**
```json
{
  "success": true,
  "message": "success",
  "data": {
    "orderId": "ORD-1234567890",
    "status": "pending",
    "packageId": "pkg-123",
    "email": "user@example.com",
    "phoneNumber": "08123456789"
  }
}
```

---

## Third-Party Backend Endpoints

These are called by the server-side client from route.ts (or from a service layer if one exists):

| Path | Method | Description |
|------|--------|-------------|
| `/api/v1/third-party/vqm/get-profile/{msisdn}` | GET | Customer profile |
| `/api/v1/third-party/vqm/get-customer-status/{msisdn}` | GET | NIK, KK, activation |
| `/api/v1/third-party/vqm/package-details/{msisdn}` | GET | Package allowances |
| `/api/v1/third-party/vqm/hlr-details/{msisdn}` | GET | Device, network, services |
| `/api/v1/third-party/nbss/device-specs/{msisdn}` | GET | Device hardware specs |
