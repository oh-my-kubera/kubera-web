import { formatKRW, formatPercent, formatDate } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type LoanEntry = components["schemas"]["LoanEntryResponse"];

interface LoanTableProps {
  entries: LoanEntry[];
}

export function LoanTable({ entries }: LoanTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground">
            <th className="pb-2 font-medium">대출기관</th>
            <th className="pb-2 font-medium">상품</th>
            <th className="pb-2 text-right font-medium">잔액</th>
            <th className="pb-2 text-right font-medium">금리</th>
            <th className="pb-2 text-right font-medium">만기일</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-b border-border/50">
              <td className="py-2.5 text-muted-foreground">{entry.lender}</td>
              <td className="py-2.5">{entry.product_name}</td>
              <td className="py-2.5 text-right font-mono">
                {formatKRW(entry.balance)}
              </td>
              <td className="py-2.5 text-right font-mono">
                {formatPercent(entry.interest_rate)}
              </td>
              <td className="py-2.5 text-right text-muted-foreground">
                {entry.end_date ? formatDate(entry.end_date) : "\u2014"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
