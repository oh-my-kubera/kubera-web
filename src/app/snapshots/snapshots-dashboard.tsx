"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useSnapshotList, useSnapshotTrend } from "@/hooks/use-snapshots";
import { SummaryCards } from "@/components/snapshots/summary-cards";
import { NetWorthChart, type TimeRange } from "@/components/snapshots/net-worth-chart";
import { SnapshotList } from "@/components/snapshots/snapshot-list";
import { ImportModal } from "@/components/snapshots/import-modal";
import { ConnectionGuard } from "@/components/connection-guard";

export function SnapshotsDashboard() {
  const [importOpen, setImportOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("ALL");
  const list = useSnapshotList();

  // Calculate date range based on selected filter
  const endDate = new Date();
  const startDate = new Date();
  if (timeRange === "1M") startDate.setMonth(endDate.getMonth() - 1);
  else if (timeRange === "3M") startDate.setMonth(endDate.getMonth() - 3);
  else if (timeRange === "1Y") startDate.setFullYear(endDate.getFullYear() - 1);

  const startStr = timeRange !== "ALL" ? startDate.toISOString().split("T")[0] : undefined;
  const endStr = timeRange !== "ALL" ? endDate.toISOString().split("T")[0] : undefined;

  const trend = useSnapshotTrend(startStr, endStr);

  const latestSnapshot = list.data?.items[0];
  const isLoading = list.isLoading || trend.isLoading;

  return (
    <ConnectionGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">스냅샷</h1>
            <p className="text-sm text-muted-foreground">
              재무 스냅샷 내역
            </p>
          </div>
          <Button onClick={() => setImportOpen(true)} size="sm">
            <Upload className="mr-2 h-4 w-4" />
            가져오기
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-lg border border-border bg-card"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            {latestSnapshot && <SummaryCards snapshot={latestSnapshot} />}

            {/* Trend Chart */}
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  순자산 추이
                </p>
                <div className="flex space-x-1 rounded-md bg-secondary p-1">
                  {(["1M", "3M", "1Y", "ALL"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${timeRange === range
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                        }`}
                    >
                      {range === "ALL" ? "전체" : range.replace("M", "개월").replace("Y", "년")}
                    </button>
                  ))}
                </div>
              </div>

              {trend.data && trend.data.length > 1 ? (
                <NetWorthChart data={trend.data} />
              ) : (
                <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
                  {trend.isLoading ? "데이터를 불러오는 중입니다..." : "차트를 구성할 충분한 데이터가 없습니다."}
                </div>
              )}
            </div>

            {/* Snapshot List */}
            <SnapshotList items={list.data?.items ?? []} />
          </>
        )}

        <ImportModal open={importOpen} onOpenChange={setImportOpen} />
      </div>
    </ConnectionGuard>
  );
}
