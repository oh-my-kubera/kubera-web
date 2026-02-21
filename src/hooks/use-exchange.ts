import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { components } from "@/lib/types/core";

type UpbitBalance = components["schemas"]["UpbitBalanceResponse"];

export const exchangeKeys = {
  upbitBalances: () => ["exchange", "upbit", "balances"] as const,
};

export function useUpbitBalances() {
  return useQuery({
    queryKey: exchangeKeys.upbitBalances(),
    queryFn: () => api<UpbitBalance[]>("/api/v1/exchange/upbit/balances"),
  });
}
