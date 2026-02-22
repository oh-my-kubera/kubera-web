import Link from "next/link";
import { formatKRW, formatDate } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type SnapshotSummary = components["schemas"]["SnapshotSummaryResponse"];

interface SnapshotListProps {
  items: SnapshotSummary[];
}

export function SnapshotList({ items }: SnapshotListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          스냅샷이 없습니다. 위에서 첫 번째 스냅샷을 가져오세요.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          내역
        </p>
        <span className="text-xs text-muted-foreground">
          {items.length}개
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/snapshots/${item.id}`}
            className="flex items-center justify-between rounded-md px-2 py-2 transition-colors hover:bg-secondary/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                {formatDate(item.snapshot_date)}
              </span>
              <span className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                {item.source}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono text-sm">{formatKRW(item.net_worth)}</p>
              <span className="w-12 text-right font-mono text-xs text-muted-foreground">
                {item.credit_score ?? "\u2014"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
