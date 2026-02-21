import { ConnectionGuard } from "@/components/connection-guard";

export default function FinancePage() {
  return (
    <ConnectionGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Finance</h1>
          <p className="text-sm text-muted-foreground">
            Bank and card transactions
          </p>
        </div>
      </div>
    </ConnectionGuard>
  );
}
