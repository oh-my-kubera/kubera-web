import { formatKRW, formatKRWCompact } from "@/lib/utils";
import { FolderPlus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { components } from "@/lib/types/core";

type UpbitBalance = components["schemas"]["UpbitBalanceResponse"];

interface BalanceTableProps {
  balances: UpbitBalance[];
}

function formatQuantity(value: string, isFiat: boolean): string {
  const num = parseFloat(value);
  if (isFiat) {
    return num.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  }
  return num.toLocaleString("ko-KR", { maximumFractionDigits: 8 });
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

  const rows = filtered.map((b) => {
    const isFiat = b.currency === "KRW";
    const balance = parseFloat(b.balance);
    const locked = parseFloat(b.locked);
    const avgPrice = parseFloat(b.avg_buy_price);
    const estimatedValue = isFiat ? balance + locked : (balance + locked) * avgPrice;

    return { ...b, isFiat, balance, locked, avgPrice, estimatedValue };
  });

  const totalValue = rows.reduce((sum, r) => sum + r.estimatedValue, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted-foreground">
            <th className="pb-2 font-medium">통화</th>
            <th className="pb-2 text-right font-medium">보유량</th>
            <th className="pb-2 text-right font-medium">잠김</th>
            <th className="pb-2 text-right font-medium">매수 평균가</th>
            <th className="pb-2 text-right font-medium">평가금액</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.currency}
              className="border-b border-border/50 transition-colors hover:bg-muted/50"
            >
              <td className="py-3 font-medium">{r.currency}</td>
              <td className="py-3 text-right font-mono">
                {formatQuantity(r.balance.toString(), r.isFiat)}
              </td>
              <td className="py-3 text-right font-mono text-muted-foreground">
                {r.locked > 0
                  ? formatQuantity(r.locked.toString(), r.isFiat)
                  : "—"}
              </td>
              <td className="py-3 text-right font-mono">
                {r.isFiat ? "—" : formatKRW(r.avgPrice)}
              </td>
              <td className="py-3 text-right font-mono">
                {formatKRWCompact(r.estimatedValue)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-border">
            <td className="pt-3 text-xs font-medium text-muted-foreground" colSpan={4}>
              총 평가금액
            </td>
            <td className="pt-3 text-right font-mono font-semibold">
              {formatKRWCompact(totalValue)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
