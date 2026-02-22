"use client";

import Link from "next/link";
import { Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConnection } from "@/hooks/use-connection";

export function ConnectionGuard({ children }: { children: React.ReactNode }) {
  const { isConnected } = useConnection();

  if (!isConnected) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-sm rounded-lg border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Plug className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold">서버 미연결</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            데이터를 보려면 kubera-core 서버에 연결하세요.
          </p>
          <Button asChild className="mt-6 w-full" size="sm">
            <Link href="/connect">서버 연결</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
