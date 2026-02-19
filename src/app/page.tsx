import { cn } from "@/lib/utils";

const accounts = [
  { name: "KB Securities", value: "₩52,300,000", type: "Securities" },
  { name: "Toss Bank", value: "₩28,750,000", type: "Banking" },
  { name: "NH Investment", value: "₩32,900,000", type: "Securities" },
  { name: "Upbit", value: "₩14,500,000", type: "Crypto" },
];

const recentActivity = [
  { date: "Feb 19", desc: "Samsung Electronics", amount: "-₩2,500,000", incoming: false },
  { date: "Feb 18", desc: "Dividend — KODEX 200", amount: "+₩45,000", incoming: true },
  { date: "Feb 17", desc: "Transfer In", amount: "+₩5,000,000", incoming: true },
  { date: "Feb 16", desc: "TIGER S&P500 ETF", amount: "-₩3,200,000", incoming: false },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Portfolio overview</p>
      </div>

      {/* Total Portfolio Value */}
      <div className="rounded-lg border border-border border-t-2 border-t-primary bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Total Assets
        </p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-tight">
          ₩128,450,000
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-mono text-sm text-positive">+₩2,340,000</span>
          <span className="font-mono text-sm text-positive">(+1.86%)</span>
          <span className="text-xs text-muted-foreground">today</span>
        </div>
      </div>

      {/* Asset Breakdown */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Stocks
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">₩85,200,000</p>
          <p className="mt-1 font-mono text-xs text-positive">+2.4%</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Cash
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">₩28,750,000</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">—</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Crypto
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold">₩14,500,000</p>
          <p className="mt-1 font-mono text-xs text-negative">-1.2%</p>
        </div>
      </div>

      {/* Accounts + Recent Activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Accounts
            </p>
            <span className="text-xs text-muted-foreground">4 connected</span>
          </div>
          <div className="mt-4 space-y-3">
            {accounts.map((account) => (
              <div key={account.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{account.name}</p>
                  <p className="text-xs text-muted-foreground">{account.type}</p>
                </div>
                <p className="font-mono text-sm">{account.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recent Activity
          </p>
          <div className="mt-4 space-y-3">
            {recentActivity.map((tx, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-12 text-xs text-muted-foreground">{tx.date}</span>
                  <p className="text-sm">{tx.desc}</p>
                </div>
                <p className={cn("font-mono text-sm", tx.incoming ? "text-positive" : "text-foreground")}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
