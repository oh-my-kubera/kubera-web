import { useQuery } from "@tanstack/react-query";
import { sanitizeHeaderValue } from "@/lib/connection";

interface HealthResult {
  ok: boolean;
  error?: string;
}

export function useHealthCheck(
  url: string,
  token: string,
  enabled: boolean,
) {
  return useQuery<HealthResult>({
    queryKey: ["health", url, token],
    queryFn: async () => {
      try {
        const safeToken = sanitizeHeaderValue(token);
        const res = await fetch(`${url}/api/v1/health`, {
          headers: { Authorization: `Bearer ${safeToken}` },
        });
        if (!res.ok) {
          return { ok: false, error: `HTTP ${res.status}` };
        }
        return { ok: true };
      } catch (e) {
        return {
          ok: false,
          error: e instanceof Error ? e.message : "Connection failed",
        };
      }
    },
    enabled,
    retry: false,
    staleTime: 0,
  });
}
