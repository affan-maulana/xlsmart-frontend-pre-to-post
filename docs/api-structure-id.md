# Arsitektur API

## Gambaran Umum

Aplikasi menggunakan arsitektur API client dua tier yang memisahkan kekhawatiran sisi browser dan server:

```
Component → Hook → apiClient (browser) → /api/* route.ts → serverApiClient → Backend API
                                                                          ↑
                                                              service (opsional)
```

**Mengapa dua client?** Browser tidak bisa memanggil backend secara langsung — Next.js API routes berperan sebagai BFF (Backend for Frontend) yang menangani auth, env secrets, dan transformasi data.

**Kapan gunakan service layer:** Folder `_service/` **opsional**. Buat service hanya jika route perlu transformasi, agregasi, atau logika bisnis sebelum/menghubungi backend. Jika route.ts hanya meneruskan request ke `serverApiClient`, skip service — tidak perlu.

---

## API Clients

### Client-Side: `lib/api-client.ts`

Berjalan di browser. Digunakan React hooks untuk memanggil Next.js API routes.

```ts
import { apiClient, ApiError } from '@/lib/api-client';

// GET dengan query params
const profile = await apiClient.get<ProfileData>('/api/pretopost', {
  params: { msisdn: '08123456789', endpoint: 'profile' },
});

// POST dengan body
const result = await apiClient.post<SubmitResponse>('/api/pretopost', {
  endpoint: 'submit',
  packageId: 'pkg-123',
  email: 'user@example.com',
});
```

**Fitur:**
- Base URL dari env `NEXT_PUBLIC_API_BASE_URL` (fallback ke `window.location.origin`)
- Baca JWT dari `sessionStorage` (key: `auth_token`), kirim sebagai `Authorization: Bearer <token>`
- Auto-unwrap `data` dari envelope `{ success, message, data }`
- Lempar `ApiError` dengan `status`, `message`, dan `data` lengkap saat gagal
- Methods: `get`, `post`, `put`, `patch`, `delete`

**Auth helpers:**
```ts
import { setAuthToken, clearAuthToken } from '@/lib/api-client';

// Setelah login
setAuthToken(jwtToken);

// Saat logout
clearAuthToken();
```

### Server-Side: `lib/server-api-client.ts`

Berjalan di Node.js (API routes / services). Memanggil backend API sebenarnya.

```ts
import { serverApiClient, ServerApiError } from '@/lib/server-api-client';

const data = await serverApiClient.get<BackendResponse>(
  `/api/v1/third-party/vqm/get-profile/${msisdn}`,
);
```

**Fitur:**
- Base URL dari env `BACKEND_API_BASE_URL` (wajib, error jika tidak ada)
- Menerima `token` per-request (di-forward dari client lewat route.ts)
- `cache: 'no-store'` pada semua request (data tidak boleh stale)
- Auto-unwrap dan error handling sama seperti client-side

---

## Environment Variables

| Variable | Scope | Keterangan |
|----------|-------|------------|
| `NEXT_PUBLIC_API_BASE_URL` | Client + Server | Base URL Next.js API routes (sisi browser) |
| `BACKEND_API_BASE_URL` | Server only | Base URL backend API sebenarnya |

**Auth:** JWT token disimpan di `sessionStorage` (key: `auth_token`), bukan di env vars. Client mengirim via header `Authorization`, dan route.ts meneruskannya ke backend.

---

## Auth Flow

```
1. User login → login hook panggil setAuthToken(jwtToken)
2. Token disimpan di sessionStorage('auth_token')
3. apiClient baca token → kirim Authorization: Bearer <token> ke route.ts
4. route.ts ambil header → lewatkan token ke service (jika ada) atau serverApiClient
5. serverApiClient → forward ke backend
```

Saat logout, panggil `clearAuthToken()` untuk hapus token dari sessionStorage.

---

## Response Envelope

Semua API response mengikuti format ini:

```ts
// Success
{ success: true, message: "success", data: T }

// Failure
{ success: false, message: "Error description", data?: unknown }
```

Kedua client auto-unwrap `data` saat berhasil dan lempar error saat gagal.

---

## Error Types

```ts
// Client-side (api-client.ts)
class ApiError extends Error {
  status: number;   // HTTP status code
  message: string;  // Pesan error dari response
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

Setiap module mengikuti konvensi folder ini:

```
app/(main)/{module}/
├── page.tsx                    # Page component (client-side)
├── _components/                # UI components
├── _hook/                      # React hooks (panggil apiClient)
└── _validation/                # Zod schemas (opsional)
```

Folder `_service/` **tidak wajib** — tambahkan hanya jika route perlu logika bisnis atau transformasi data sebelum hubungi backend. Jika route hanya proxy ke `serverApiClient`, panggil langsung dari route.ts.

---

## Adding a New Module

### 1. Buat API route

**Tanpa service layer** (pass-through langsung):

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

**Dengan service layer** (jika perlu transformasi/agregasi):

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
// ... struktur route sama, tapi panggil mymoduleService.getData()
```

### 2. Gunakan di hook

```ts
// app/(main)/mymodule/_hook/useMyData.ts
'use client';
import { useState, useEffect } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';

type MyData = { /* define inline atau dari shared types file */ };

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

### 3. (Opsional) Tambah validasi Zod

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

| Param | Tipe | Wajib | Keterangan |
|-------|------|-------|------------|
| `msisdn` | string | Ya | Nomor HP |
| `endpoint` | string | Ya | Salah satu: `profile`, `customer-status`, `package-details`, `hlr-details`, `device-specs` |

**Response:**
```json
{
  "success": true,
  "message": "success",
  "data": { /* sesuai endpoint */ }
}
```

### POST `/api/pretopost`

| Body Field | Tipe | Wajib | Keterangan |
|------------|------|-------|------------|
| `endpoint` | string | Ya | Salah satu: `submit` |
| `packageId` | string | Ya | ID paket yang dipilih |
| `email` | string | Ya | Email pelanggan |
| `phoneNumber` | string | Tidak | Nomor HP alternatif |

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

Dipanggil oleh server-side client dari route.ts (atau dari service layer jika ada):

| Path | Method | Keterangan |
|------|--------|------------|
| `/api/v1/third-party/vqm/get-profile/{msisdn}` | GET | Profil pelanggan |
| `/api/v1/third-party/vqm/get-customer-status/{msisdn}` | GET | NIK, KK, aktivasi |
| `/api/v1/third-party/vqm/package-details/{msisdn}` | GET | Kuota paket |
| `/api/v1/third-party/vqm/hlr-details/{msisdn}` | GET | Perangkat, jaringan, layanan |
| `/api/v1/third-party/nbss/device-specs/{msisdn}` | GET | Spesifikasi perangkat |
