import { formatKRWCompact } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type SnapshotSummary = components["schemas"]["SnapshotSummaryResponse"];

interface SummaryCardsProps {
  snapshot: SnapshotSummary;
}

export function SummaryCards({ snapshot }: SummaryCardsProps) {
  return (
    <div className="space-y-4">
      {/* Accent card — Net Worth */}
      <div className="rounded-lg border border-border border-t-2 border-t-primary bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/50">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          순자산
        </p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-tight">
          {formatKRWCompact(snapshot.net_worth)}
        </p>
      </div>

      {/* Grid — Assets, Liabilities, Credit Score */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            총 자산
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatKRWCompact(snapshot.total_assets)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            총 부채
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatKRWCompact(snapshot.total_liabilities)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            신용점수
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {snapshot.credit_score ?? "\u2014"}
          </p>
        </div>
      </div>
    </div>
  );
}
