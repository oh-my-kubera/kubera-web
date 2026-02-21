"use client";

import { ConnectionGuard } from "@/components/connection-guard";
import { BalanceTable } from "@/components/exchange/balance-table";
import { useUpbitBalances } from "@/hooks/use-exchange";
import { ApiError } from "@/lib/api";

export function ExchangeDashboard() {
  return (
    <ConnectionGuard>
      <ExchangeContent />
    </ConnectionGuard>
  );
}

function ExchangeContent() {
  const { data, isLoading, error } = useUpbitBalances();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Exchange</h1>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Upbit Balances
        </h2>

        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-10 animate-pulse rounded bg-secondary"
              />
            ))}
          </div>
        )}

        {error && <ErrorMessage error={error} />}

        {data && <BalanceTable balances={data} />}
      </section>
    </div>
  );
}

function ErrorMessage({ error }: { error: Error }) {
  if (error instanceof ApiError && error.status === 400) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Upbit credential not configured.
        <br />
        Run{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
          kubera-core credential add upbit
        </code>{" "}
        to set up your API keys.
      </p>
    );
  }

  return (
    <p className="py-12 text-center text-sm text-destructive">
      {error.message}
    </p>
  );
}
