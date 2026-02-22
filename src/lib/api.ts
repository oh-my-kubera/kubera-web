import { getServerUrl, getToken } from "./connection";

export class ApiError extends Error {
  status: number;
  detail: unknown;

  constructor(status: number, body: Record<string, unknown>) {
    const message =
      typeof body.detail === "string" ? body.detail : `API error ${status}`;
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = body.detail ?? body;
  }
}

export async function api<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const serverUrl = getServerUrl();
  if (!serverUrl) {
    throw new ApiError(0, { detail: "No server connection configured" });
  }

  const res = await fetch(`${serverUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let body: Record<string, unknown>;
    try {
      body = await res.json();
    } catch {
      body = { detail: res.statusText };
    }
    throw new ApiError(res.status, body);
  }

  return res.json() as Promise<T>;
}

export async function apiUpload<T>(
  path: string,
  formData: FormData,
  queryParams?: Record<string, string>
): Promise<T> {
  const serverUrl = getServerUrl();
  if (!serverUrl) {
    throw new ApiError(0, { detail: "No server connection configured" });
  }

  let url = `${serverUrl}${path}`;
  if (queryParams) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) params.set(key, value);
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!res.ok) {
    let body: Record<string, unknown>;
    try {
      body = await res.json();
    } catch {
      body = { detail: res.statusText };
    }
    throw new ApiError(res.status, body);
  }

  return res.json() as Promise<T>;
}
