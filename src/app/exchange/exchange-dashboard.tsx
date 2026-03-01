"use client";

import { ConnectionGuard } from "@/components/connection-guard";
import { BalanceTable } from "@/components/exchange/balance-table";
import { KisBalanceTable } from "@/components/exchange/kis-balance-table";
import { useUpbitBalances, useKisBalance } from "@/hooks/use-exchange";
import { ApiError } from "@/lib/api";

export function ExchangeDashboard() {
  return (
    <ConnectionGuard>
      <ExchangeContent />
    </ConnectionGuard>
  );
}

function ExchangeContent() {
  const upbit = useUpbitBalances();
  const kis = useKisBalance();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">거래소</h1>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          업비트 잔고
        </h2>

        {upbit.isLoading && <SkeletonRows />}
        {upbit.error && (
          <ErrorMessage error={upbit.error} provider="upbit" />
        )}
        {upbit.data && <BalanceTable balances={upbit.data} />}
      </section>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          한국투자증권 잔고
        </h2>

        {kis.isLoading && <SkeletonRows />}
        {kis.error && <ErrorMessage error={kis.error} provider="kis" />}
        {kis.data && <KisBalanceTable summary={kis.data} />}
      </section>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-10 animate-pulse rounded bg-secondary" />
      ))}
    </div>
  );
}

function ErrorMessage({
  error,
  provider,
}: {
  error: Error;
  provider: "upbit" | "kis";
}) {
  const labels = {
    upbit: { name: "업비트", command: "kubera-core credential add upbit" },
    kis: { name: "한국투자증권", command: "kubera-core credential add kis" },
  };
  const label = labels[provider];

  if (error instanceof ApiError && error.status === 400) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        {label.name} 인증 정보가 설정되지 않았습니다.
        <br />
        <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
          {label.command}
        </code>
        으로 API 키를 등록하세요.
      </p>
    );
  }

  return (
    <p className="py-12 text-center text-sm text-destructive">
      {error.message}
    </p>
  );
}
