"use client";

import { useMemo } from "react";
import { ConnectionGuard } from "@/components/connection-guard";
import {
  useSnapshotList,
  useSnapshotTrend,
  useSnapshotDetail,
} from "@/hooks/use-snapshots";
import { formatKRWCompact, formatPercent, cn } from "@/lib/utils";
import { NetWorthChart } from "@/components/snapshots/net-worth-chart";
import { AssetAllocation } from "@/components/snapshots/asset-allocation";
import { SnapshotList } from "@/components/snapshots/snapshot-list";
import { EmptyState } from "@/components/ui/empty-state";
import { FolderPlus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

function ChangeIndicator({
  diff,
  percent,
  invertColor,
  unit,
}: {
  diff: number;
  percent: number | null;
  invertColor?: boolean;
  unit?: string;
}) {
  const isZero = diff === 0;
  const isGood = invertColor ? diff < 0 : diff > 0;
  const Icon = isZero ? Minus : isGood ? TrendingUp : TrendingDown;
  const colorClass = isZero
    ? "text-muted-foreground"
    : isGood
      ? "text-[hsl(var(--positive))]"
      : "text-[hsl(var(--negative))]";

  const label = unit
    ? `${diff > 0 ? "+" : ""}${diff}${unit}`
    : formatPercent(percent);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium",
        colorClass,
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function DashboardContent() {
  const list = useSnapshotList(1, 5);
  const trend = useSnapshotTrend();
  const router = useRouter();

  const latest = list.data?.items?.[0];
  const detail = useSnapshotDetail(latest?.id ?? 0);

  const changes = useMemo(() => {
    if (!trend.data || trend.data.length < 2) return null;
    const curr = trend.data[trend.data.length - 1];
    const prev = trend.data[trend.data.length - 2];

    const currNetWorth = parseFloat(curr.net_worth);
    const prevNetWorth = parseFloat(prev.net_worth);
    const currAssets = parseFloat(curr.total_assets);
    const prevAssets = parseFloat(prev.total_assets);
    const currLiabilities = parseFloat(curr.total_liabilities);
    const prevLiabilities = parseFloat(prev.total_liabilities);

    const netWorthDiff = currNetWorth - prevNetWorth;
    const assetsDiff = currAssets - prevAssets;
    const liabilitiesDiff = currLiabilities - prevLiabilities;

    return {
      netWorth: {
        diff: netWorthDiff,
        percent:
          prevNetWorth !== 0
            ? (netWorthDiff / Math.abs(prevNetWorth)) * 100
            : null,
      },
      assets: {
        diff: assetsDiff,
        percent:
          prevAssets !== 0
            ? (assetsDiff / Math.abs(prevAssets)) * 100
            : null,
      },
      liabilities: {
        diff: liabilitiesDiff,
        percent:
          prevLiabilities !== 0
            ? (liabilitiesDiff / Math.abs(prevLiabilities)) * 100
            : null,
      },
      creditScore:
        curr.credit_score != null && prev.credit_score != null
          ? curr.credit_score - prev.credit_score
          : null,
    };
  }, [trend.data]);

  if (list.isLoading) {
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
        <div className="h-[360px] animate-pulse rounded-lg border border-border bg-card" />
        <div className="h-[310px] animate-pulse rounded-lg border border-border bg-card" />
        <div className="h-48 animate-pulse rounded-lg border border-border bg-card" />
      </div>
    );
  }

  if (!latest) {
    return (
      <EmptyState
        icon={FolderPlus}
        title="스냅샷을 가져오세요"
        description="등록된 재무 스냅샷이 없습니다. 자산 배분 내역이 담긴 파일이나 시스템에서 데이터를 가져와 대시보드를 구성하세요."
        actionLabel="스냅샷 가져오기 가기"
        onAction={() => router.push("/snapshots")}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Net Worth */}
      <div className="rounded-lg border border-border border-t-2 border-t-primary bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/50">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          순자산
        </p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-tight">
          {formatKRWCompact(Number(latest.net_worth))}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-xs text-muted-foreground">
            {latest.snapshot_date} 기준
          </p>
          {changes && (
            <ChangeIndicator
              diff={changes.netWorth.diff}
              percent={changes.netWorth.percent}
            />
          )}
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            총 자산
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatKRWCompact(Number(latest.total_assets))}
          </p>
          {changes && (
            <div className="mt-1">
              <ChangeIndicator
                diff={changes.assets.diff}
                percent={changes.assets.percent}
              />
            </div>
          )}
        </div>
        <div className="rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            총 부채
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatKRWCompact(Number(latest.total_liabilities))}
          </p>
          {changes && (
            <div className="mt-1">
              <ChangeIndicator
                diff={changes.liabilities.diff}
                percent={changes.liabilities.percent}
                invertColor
              />
            </div>
          )}
        </div>
        <div className="rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            신용점수
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {latest.credit_score ?? "—"}
          </p>
          {changes?.creditScore != null && (
            <div className="mt-1">
              <ChangeIndicator
                diff={changes.creditScore}
                percent={null}
                unit="점"
              />
            </div>
          )}
        </div>
      </div>

      {/* Net Worth Trend */}
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          순자산 추이
        </p>
        {trend.isLoading ? (
          <div className="mt-4 h-[300px] animate-pulse rounded bg-secondary" />
        ) : trend.data && trend.data.length > 1 ? (
          <NetWorthChart data={trend.data} />
        ) : (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            차트를 구성할 충분한 데이터가 없습니다.
          </div>
        )}
      </div>

      {/* Asset Allocation */}
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          자산 배분
        </p>
        {detail.isLoading ? (
          <div className="h-[250px] animate-pulse rounded bg-secondary" />
        ) : detail.data && detail.data.asset_entries.length > 0 ? (
          <AssetAllocation entries={detail.data.asset_entries} />
        ) : (
          <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
            자산 배분 데이터가 없습니다.
          </div>
        )}
      </div>

      {/* Recent Snapshots */}
      {list.data && list.data.items.length > 1 && (
        <SnapshotList items={list.data.items} />
      )}
    </div>
  );
}

export function Dashboard() {
  return (
    <ConnectionGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">대시보드</h1>
          <p className="text-sm text-muted-foreground">자산 현황</p>
        </div>
        <DashboardContent />
      </div>
    </ConnectionGuard>
  );
}
