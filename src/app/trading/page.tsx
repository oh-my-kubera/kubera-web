import { ConnectionGuard } from "@/components/connection-guard";

export default function TradingPage() {
  return (
    <ConnectionGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Trading</h1>
          <p className="text-sm text-muted-foreground">
            Live trading and position management
          </p>
        </div>
      </div>
    </ConnectionGuard>
  );
}
