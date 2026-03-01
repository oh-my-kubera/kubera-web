import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { components } from "@/lib/types/core";

type UpbitBalance = components["schemas"]["UpbitBalanceResponse"];
type KisBalanceSummary = components["schemas"]["KisBalanceSummaryResponse"];

export const exchangeKeys = {
  upbitBalances: () => ["exchange", "upbit", "balances"] as const,
  kisBalance: () => ["exchange", "kis", "balance"] as const,
};

export function useUpbitBalances() {
  return useQuery({
    queryKey: exchangeKeys.upbitBalances(),
    queryFn: () => api<UpbitBalance[]>("/api/v1/exchange/upbit/balances"),
  });
}

export function useKisBalance() {
  return useQuery({
    queryKey: exchangeKeys.kisBalance(),
    queryFn: () => api<KisBalanceSummary>("/api/v1/exchange/kis/balance"),
  });
}
