"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useSnapshotList, useSnapshotTrend } from "@/hooks/use-snapshots";
import { SummaryCards } from "@/components/snapshots/summary-cards";
import { NetWorthChart } from "@/components/snapshots/net-worth-chart";
import { SnapshotList } from "@/components/snapshots/snapshot-list";
import { ImportModal } from "@/components/snapshots/import-modal";
import { ConnectionGuard } from "@/components/connection-guard";

export function SnapshotsDashboard() {
  const [importOpen, setImportOpen] = useState(false);
  const list = useSnapshotList();
  const trend = useSnapshotTrend();

  const latestSnapshot = list.data?.items[0];
  const isLoading = list.isLoading || trend.isLoading;

  return (
    <ConnectionGuard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Snapshots</h1>
            <p className="text-sm text-muted-foreground">
              Financial snapshot history
            </p>
          </div>
          <Button onClick={() => setImportOpen(true)} size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
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
            {trend.data && trend.data.length > 1 && (
              <NetWorthChart data={trend.data} />
            )}

            {/* Snapshot List */}
            <SnapshotList items={list.data?.items ?? []} />
          </>
        )}

        <ImportModal open={importOpen} onOpenChange={setImportOpen} />
      </div>
    </ConnectionGuard>
  );
}
