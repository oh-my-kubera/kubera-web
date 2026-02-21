"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConnection } from "@/hooks/use-connection";
import { useHealthCheck } from "@/hooks/use-health";
import { CheckCircle2, XCircle, Loader2, Plug, Unplug } from "lucide-react";

export function ConnectForm() {
  const { connection, isConnected, save, clear, getRecent } = useConnection();
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [testRequested, setTestRequested] = useState(false);

  const trimmedUrl = url.replace(/\/+$/, "");
  const health = useHealthCheck(trimmedUrl, token, testRequested);

  function handleTest() {
    if (!url.trim()) return;
    setTestRequested(true);
  }

  function handleSave() {
    save({ url: trimmedUrl, token });
    setUrl("");
    setToken("");
    setTestRequested(false);
  }

  function handleQuickConnect(conn: { url: string; token: string }) {
    setUrl(conn.url);
    setToken(conn.token);
    setTestRequested(false);
  }

  function handleDisconnect() {
    clear();
    setTestRequested(false);
  }

  const recentConnections = getRecent().filter(
    (c) => c.url !== connection?.url,
  );

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          서버 연결
        </h1>
        <p className="text-sm text-muted-foreground">
          kubera-core 서버에 연결합니다
        </p>
      </div>

      {/* Current Connection Status */}
      {isConnected && connection && (
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-positive/10">
                <Plug className="h-4 w-4 text-positive" />
              </div>
              <div>
                <p className="text-sm font-medium">연결됨</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {connection.url}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleDisconnect}>
              <Unplug className="mr-2 h-4 w-4" />
              연결 해제
            </Button>
          </div>
        </div>
      )}

      {/* Connection Form */}
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {isConnected ? "연결 변경" : "새 연결"}
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">서버 URL</Label>
            <Input
              id="url"
              placeholder="http://localhost:8000"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setTestRequested(false);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="token">API 토큰</Label>
            <Input
              id="token"
              type="password"
              placeholder="선택사항"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                setTestRequested(false);
              }}
            />
          </div>

          {/* Test result */}
          {testRequested && (
            <div className="rounded-md border border-border px-4 py-3">
              {health.isLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  연결 테스트 중...
                </div>
              ) : health.data?.ok ? (
                <div className="flex items-center gap-2 text-sm text-positive">
                  <CheckCircle2 className="h-4 w-4" />
                  연결 성공
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <XCircle className="h-4 w-4" />
                  {health.data?.error ?? "연결 실패"}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            {!testRequested || !health.data?.ok ? (
              <Button
                onClick={handleTest}
                disabled={!url.trim() || health.isLoading}
                className="flex-1"
                size="sm"
              >
                {health.isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                연결 테스트
              </Button>
            ) : (
              <Button onClick={handleSave} className="flex-1" size="sm">
                저장 및 연결
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Recent Connections */}
      {recentConnections.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            최근 연결
          </p>
          <div className="space-y-2">
            {recentConnections.map((conn) => (
              <button
                key={conn.url}
                onClick={() => handleQuickConnect(conn)}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-secondary"
              >
                <Plug className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate font-mono text-sm">{conn.url}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
