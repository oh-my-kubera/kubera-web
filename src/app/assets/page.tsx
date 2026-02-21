import { ConnectionGuard } from "@/components/connection-guard";

export default function AssetsPage() {
  return (
    <ConnectionGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Assets</h1>
          <p className="text-sm text-muted-foreground">
            Per-account balances and trend graphs
          </p>
        </div>
      </div>
    </ConnectionGuard>
  );
}
