import { formatKRW, formatDate } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type InsuranceEntry = components["schemas"]["InsuranceEntryResponse"];

interface InsuranceTableProps {
  entries: InsuranceEntry[];
}

export function InsuranceTable({ entries }: InsuranceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground">
            <th className="pb-2 font-medium">Insurer</th>
            <th className="pb-2 font-medium">Product</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 text-right font-medium">Total Paid</th>
            <th className="pb-2 text-right font-medium">Period</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const period =
              entry.start_date && entry.end_date
                ? `${formatDate(entry.start_date)} — ${formatDate(entry.end_date)}`
                : entry.start_date
                  ? `${formatDate(entry.start_date)} —`
                  : "\u2014";
            return (
              <tr key={entry.id} className="border-b border-border/50">
                <td className="py-2.5 text-muted-foreground">
                  {entry.insurer}
                </td>
                <td className="py-2.5">{entry.product_name}</td>
                <td className="py-2.5">
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-xs">
                    {entry.status}
                  </span>
                </td>
                <td className="py-2.5 text-right font-mono">
                  {formatKRW(entry.total_paid)}
                </td>
                <td className="py-2.5 text-right text-xs text-muted-foreground">
                  {period}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
