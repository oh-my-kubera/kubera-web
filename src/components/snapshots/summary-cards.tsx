import { formatKRW } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type SnapshotSummary = components["schemas"]["SnapshotSummaryResponse"];

interface SummaryCardsProps {
  snapshot: SnapshotSummary;
}

export function SummaryCards({ snapshot }: SummaryCardsProps) {
  return (
    <div className="space-y-4">
      {/* Accent card — Net Worth */}
      <div className="rounded-lg border border-border border-t-2 border-t-primary bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Net Worth
        </p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-tight">
          {formatKRW(snapshot.net_worth)}
        </p>
      </div>

      {/* Grid — Assets, Liabilities, Credit Score */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Assets
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatKRW(snapshot.total_assets)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Liabilities
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatKRW(snapshot.total_liabilities)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Credit Score
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {snapshot.credit_score ?? "\u2014"}
          </p>
        </div>
      </div>
    </div>
  );
}
