import { cn, formatKRW, formatPercent } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type InvestmentEntry = components["schemas"]["InvestmentEntryResponse"];

interface InvestmentTableProps {
  entries: InvestmentEntry[];
}

export function InvestmentTable({ entries }: InvestmentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground">
            <th className="pb-2 font-medium">증권사</th>
            <th className="pb-2 font-medium">상품</th>
            <th className="pb-2 text-right font-medium">투자금</th>
            <th className="pb-2 text-right font-medium">현재가</th>
            <th className="pb-2 text-right font-medium">수익률</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const rate = entry.return_rate ? parseFloat(entry.return_rate) : null;
            return (
              <tr key={entry.id} className="border-b border-border/50">
                <td className="py-2.5 text-muted-foreground">{entry.broker}</td>
                <td className="py-2.5">{entry.product_name}</td>
                <td className="py-2.5 text-right font-mono">
                  {formatKRW(entry.invested_amount)}
                </td>
                <td className="py-2.5 text-right font-mono">
                  {formatKRW(entry.current_value)}
                </td>
                <td
                  className={cn(
                    "py-2.5 text-right font-mono",
                    rate === null
                      ? "text-muted-foreground"
                      : rate > 0
                        ? "text-positive"
                        : "text-negative"
                  )}
                >
                  {formatPercent(rate)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
