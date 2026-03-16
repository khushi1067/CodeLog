const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5000";

type ApiError = { message?: string; errors?: unknown };

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    credentials: "include" // IMPORTANT for cookies
  });

  if (!res.ok) {
    let err: ApiError = {};
    try {
      err = await res.json();
    } catch {}
    throw new Error(err.message || `Request failed (${res.status})`);
  }

  // handle 204 no content
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}