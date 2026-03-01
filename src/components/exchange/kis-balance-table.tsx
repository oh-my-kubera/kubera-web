import { formatKRW, formatKRWCompact, formatPercent } from "@/lib/utils";
import { FolderPlus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { components } from "@/lib/types/core";

type KisBalanceSummary = components["schemas"]["KisBalanceSummaryResponse"];

interface KisBalanceTableProps {
  summary: KisBalanceSummary;
}

export function KisBalanceTable({ summary }: KisBalanceTableProps) {
  const { holdings } = summary;

  if (holdings.length === 0) {
    return (
      <EmptyState
        icon={FolderPlus}
        title="보유 종목이 없습니다"
        description="현재 한국투자증권 계좌에 보유 중인 종목이 없습니다."
        className="min-h-[300px]"
      />
    );
  }

  const totalEvlu = parseFloat(summary.tot_evlu_amt);
  const totalPfls = parseFloat(summary.evlu_pfls_smtl_amt);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground">
            <th className="pb-2 font-medium">종목</th>
            <th className="pb-2 text-right font-medium">수량</th>
            <th className="pb-2 text-right font-medium">매입가</th>
            <th className="pb-2 text-right font-medium">현재가</th>
            <th className="pb-2 text-right font-medium">평가금액</th>
            <th className="pb-2 text-right font-medium">수익률</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => {
            const pfls = parseFloat(h.evlu_pfls_rt);
            return (
              <tr
                key={h.pdno}
                className="border-b border-border/50 transition-colors hover:bg-muted/50"
              >
                <td className="py-3">
                  <div className="font-medium">{h.prdt_name}</div>
                  <div className="text-xs text-muted-foreground">{h.pdno}</div>
                </td>
                <td className="py-3 text-right font-mono">
                  {parseInt(h.hldg_qty).toLocaleString("ko-KR")}
                </td>
                <td className="py-3 text-right font-mono">
                  {formatKRW(h.pchs_avg_pric)}
                </td>
                <td className="py-3 text-right font-mono">
                  {formatKRW(h.prpr)}
                </td>
                <td className="py-3 text-right font-mono">
                  {formatKRWCompact(h.evlu_amt)}
                </td>
                <td
                  className={`py-3 text-right font-mono ${
                    pfls > 0
                      ? "text-[hsl(var(--stock-profit))]"
                      : pfls < 0
                        ? "text-[hsl(var(--stock-loss))]"
                        : ""
                  }`}
                >
                  {formatPercent(h.evlu_pfls_rt)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-border">
            <td
              className="pt-3 text-xs font-medium text-muted-foreground"
              colSpan={4}
            >
              총 평가금액 / 매입금액 / 손익
            </td>
            <td className="pt-3 text-right font-mono font-semibold">
              {formatKRWCompact(totalEvlu)}
            </td>
            <td
              className={`pt-3 text-right font-mono text-xs ${
                totalPfls > 0
                  ? "text-[hsl(var(--stock-profit))]"
                  : totalPfls < 0
                    ? "text-[hsl(var(--stock-loss))]"
                    : ""
              }`}
            >
              {formatKRWCompact(totalPfls)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
