import { formatKRW } from "@/lib/utils";
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
      <p className="py-12 text-center text-sm text-muted-foreground">
        보유 자산이 없습니다.
      </p>
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
              <tr key={b.currency} className="border-b border-border/50">
                <td className="py-2.5 font-medium">{b.currency}</td>
                <td className="py-2.5 text-right font-mono">
                  {parseFloat(b.balance).toLocaleString("ko-KR", {
                    maximumFractionDigits: 8,
                  })}
                </td>
                <td className="py-2.5 text-right font-mono text-muted-foreground">
                  {parseFloat(b.locked) > 0
                    ? parseFloat(b.locked).toLocaleString("ko-KR", {
                        maximumFractionDigits: 8,
                      })
                    : "—"}
                </td>
                <td className="py-2.5 text-right font-mono">
                  {isKRW
                    ? formatKRW(b.avg_buy_price)
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
