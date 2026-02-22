import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { components } from "@/lib/types/core";

type PaginatedSnapshots = components["schemas"]["PaginatedResponse_SnapshotSummaryResponse_"];
type SnapshotDetail = components["schemas"]["SnapshotDetailResponse"];
type TrendPoint = components["schemas"]["TrendPointResponse"];

export const snapshotKeys = {
  all: ["snapshots"] as const,
  list: (page: number, size: number) => ["snapshots", "list", page, size] as const,
  trend: (start?: string, end?: string) => ["snapshots", "trend", start, end] as const,
  detail: (id: number) => ["snapshots", "detail", id] as const,
};

export function useSnapshotList(page = 1, size = 20) {
  return useQuery({
    queryKey: snapshotKeys.list(page, size),
    queryFn: () =>
      api<PaginatedSnapshots>(`/api/v1/snapshots?page=${page}&size=${size}`),
  });
}

export function useSnapshotTrend(start?: string, end?: string) {
  return useQuery({
    queryKey: snapshotKeys.trend(start, end),
    queryFn: () => {
      const params = new URLSearchParams();
      if (start) params.append("start", start);
      if (end) params.append("end", end);
      const qs = params.toString() ? `?${params.toString()}` : "";
      return api<TrendPoint[]>(`/api/v1/snapshots/trend${qs}`);
    },
  });
}

export function useSnapshotDetail(id: number) {
  return useQuery({
    queryKey: snapshotKeys.detail(id),
    queryFn: () => api<SnapshotDetail>(`/api/v1/snapshots/${id}`),
    enabled: id > 0,
  });
}
