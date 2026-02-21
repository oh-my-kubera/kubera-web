"use client";

import { ConnectionGuard } from "@/components/connection-guard";
import { useAssetSummary } from "@/hooks/use-assets";
import { formatKRW } from "@/lib/utils";

function DashboardContent() {
  const { data, isLoading } = useAssetSummary();

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

  if (!data) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
        No asset data available. Import a snapshot to get started.
      </div>
    );
  }

  const breakdownEntries = Object.entries(data.breakdown);

  return (
    <div className="space-y-6">
      {/* Total Value */}
      <div className="rounded-lg border border-border border-t-2 border-t-primary bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Total Assets
        </p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-tight">
          {formatKRW(data.total_krw)}
        </p>
      </div>

      {/* Breakdown */}
      {breakdownEntries.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {breakdownEntries.map(([category, value]) => (
            <div
              key={category}
              className="rounded-lg border border-border bg-card p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {category}
              </p>
              <p className="mt-2 font-mono text-2xl font-semibold">
                {formatKRW(value)}
              </p>
            </div>
          ))}
        </div>
      )}
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
