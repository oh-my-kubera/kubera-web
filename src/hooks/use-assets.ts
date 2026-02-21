import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { components } from "@/lib/types/core";

type AssetSummary = components["schemas"]["AssetSummary"];

export const assetKeys = {
  all: ["assets"] as const,
  summary: () => ["assets", "summary"] as const,
};

export function useAssetSummary() {
  return useQuery({
    queryKey: assetKeys.summary(),
    queryFn: () => api<AssetSummary>("/api/v1/assets/summary"),
  });
}
