"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSnapshotDetail } from "@/hooks/use-snapshots";
import { formatDate } from "@/lib/utils";
import { SummaryCards } from "@/components/snapshots/summary-cards";
import { AssetAllocation } from "@/components/snapshots/asset-allocation";
import { InvestmentTable } from "@/components/snapshots/investment-table";
import { LoanTable } from "@/components/snapshots/loan-table";
import { InsuranceTable } from "@/components/snapshots/insurance-table";

interface SnapshotDetailProps {
  id: number;
}

export function SnapshotDetail({ id }: SnapshotDetailProps) {
  const { data, isLoading } = useSnapshotDetail(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-lg border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
        Snapshot not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/snapshots"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Snapshots
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          Snapshot — {formatDate(data.snapshot_date)}
        </h1>
        <p className="text-sm text-muted-foreground">
          Source: {data.source}
        </p>
      </div>

      {/* Summary */}
      <SummaryCards snapshot={data} />

      {/* Asset Allocation */}
      {data.asset_entries.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Asset Allocation
          </p>
          <AssetAllocation entries={data.asset_entries} />
        </div>
      )}

      {/* Investments */}
      {data.investment_entries.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Investments
          </p>
          <InvestmentTable entries={data.investment_entries} />
        </div>
      )}

      {/* Loans */}
      {data.loan_entries.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Loans
          </p>
          <LoanTable entries={data.loan_entries} />
        </div>
      )}

      {/* Insurance */}
      {data.insurance_entries.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Insurance
          </p>
          <InsuranceTable entries={data.insurance_entries} />
        </div>
      )}
    </div>
  );
}
