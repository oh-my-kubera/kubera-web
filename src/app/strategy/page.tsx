import { ConnectionGuard } from "@/components/connection-guard";

export default function StrategyPage() {
  return (
    <ConnectionGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Strategy</h1>
          <p className="text-sm text-muted-foreground">
            Strategy management and configuration
          </p>
        </div>
      </div>
    </ConnectionGuard>
  );
}
