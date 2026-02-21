"use client";

import { ConnectionGuard } from "@/components/connection-guard";
import { useSnapshotList } from "@/hooks/use-snapshots";
import { formatKRW } from "@/lib/utils";

function DashboardContent() {
  const { data, isLoading } = useSnapshotList(1, 1);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-lg border border-border bg-card" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-lg border border-border bg-card"
            />
          ))}
        </div>
      </div>
    );
  }

  const latest = data?.items?.[0];

  if (!latest) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
        No snapshot data available. Import a snapshot to get started.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Net Worth */}
      <div className="rounded-lg border border-border border-t-2 border-t-primary bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Net Worth
        </p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-tight">
          {formatKRW(Number(latest.net_worth))}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          as of {latest.snapshot_date}
        </p>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Assets
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatKRW(Number(latest.total_assets))}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Liabilities
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatKRW(Number(latest.total_liabilities))}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Credit Score
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {latest.credit_score ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <ConnectionGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Portfolio overview</p>
        </div>
        <DashboardContent />
      </div>
    </ConnectionGuard>
  );
}
