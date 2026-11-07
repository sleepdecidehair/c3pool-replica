const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

function buildUrl(path: string, params?: QueryParams): URL {
  const base = typeof window === "undefined" ? "http://localhost" : window.location.origin;
  const url = new URL(`${API_BASE}${path}`, base);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url;
}

export async function apiGet<T>(path: string, params?: QueryParams): Promise<T> {
  const response = await fetch(buildUrl(path, params), {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    throw new ApiError(response.status, `GET ${path} 失败：HTTP ${response.status}`);
  }
  return (await response.json()) as T;
}
