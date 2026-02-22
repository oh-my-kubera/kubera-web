import { formatKRWCompact } from "@/lib/utils";
import { FolderPlus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { components } from "@/lib/types/core";

type UpbitBalance = components["schemas"]["UpbitBalanceResponse"];

interface BalanceTableProps {
  balances: UpbitBalance[];
}

export function BalanceTable({ balances }: BalanceTableProps) {
  const filtered = balances.filter(
    (b) => parseFloat(b.balance) > 0 || parseFloat(b.locked) > 0
  );

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={FolderPlus}
        title="보유 자산이 없습니다"
        description="현재 업비트 계좌에 보유 중인 활성 자산이 없습니다. 거래소에서 매수를 진행하면 여기에 표시됩니다."
        className="min-h-[300px]"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground">
            <th className="pb-2 font-medium">통화</th>
            <th className="pb-2 text-right font-medium">보유량</th>
            <th className="pb-2 text-right font-medium">잠김</th>
            <th className="pb-2 text-right font-medium">매수 평균가</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b) => {
            const isKRW = b.unit_currency === "KRW";
            return (
              <tr
                key={b.currency}
                className="border-b border-border/50 transition-colors hover:bg-muted/50"
              >
                <td className="py-3 font-medium">{b.currency}</td>
                <td className="py-3 text-right font-mono">
                  {parseFloat(b.balance).toLocaleString("ko-KR", {
                    maximumFractionDigits: 8,
                  })}
                </td>
                <td className="py-3 text-right font-mono text-muted-foreground">
                  {parseFloat(b.locked) > 0
                    ? parseFloat(b.locked).toLocaleString("ko-KR", {
                      maximumFractionDigits: 8,
                    })
                    : "—"}
                </td>
                <td className="py-3 text-right font-mono">
                  {isKRW
                    ? formatKRWCompact(b.avg_buy_price)
                    : parseFloat(b.avg_buy_price).toLocaleString("ko-KR", {
                      maximumFractionDigits: 2,
                    })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
