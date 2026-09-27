export class ServerApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ServerApiError';
  }
}

type ServerRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  token?: string;
};

function getBackendBaseUrl(): string {
  const url = process.env.BACKEND_API_BASE_URL;
  if (!url) throw new Error('BACKEND_API_BASE_URL is not set in environment variables');
  return url.replace(/\/$/, '');
}

function buildServerUrl(
  basePath: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  const base = getBackendBaseUrl();
  const url = new URL(basePath, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

async function serverRequest<T>(path: string, options: ServerRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, params, token } = options;

  const url = buildServerUrl(path, params);

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: 'no-store',
  });

  const json = await res.json();

  if (!res.ok || json.success === false) {
    throw new ServerApiError(res.status, json.message ?? 'Backend request failed', json);
  }

  return json.data as T;
}

export const serverApiClient = {
  get: <T>(path: string, options?: Omit<ServerRequestOptions, 'method' | 'body'>) =>
    serverRequest<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, body?: unknown, options?: Omit<ServerRequestOptions, 'method'>) =>
    serverRequest<T>(path, { ...options, method: 'POST', body }),

  put: <T>(path: string, body?: unknown, options?: Omit<ServerRequestOptions, 'method'>) =>
    serverRequest<T>(path, { ...options, method: 'PUT', body }),

  patch: <T>(path: string, body?: unknown, options?: Omit<ServerRequestOptions, 'method'>) =>
    serverRequest<T>(path, { ...options, method: 'PATCH', body }),

  delete: <T>(path: string, options?: Omit<ServerRequestOptions, 'method' | 'body'>) =>
    serverRequest<T>(path, { ...options, method: 'DELETE' }),
};
