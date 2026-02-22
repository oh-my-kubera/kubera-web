"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { useImportSnapshot } from "@/hooks/use-import-snapshot";
import { ApiError } from "@/lib/api";
import { formatKRW, formatDate } from "@/lib/utils";
import type { components } from "@/lib/types/core";

type SnapshotSummary = components["schemas"]["SnapshotSummaryResponse"];

interface ImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportModal({ open, onOpenChange }: ImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<SnapshotSummary | null>(null);
  const mutation = useImportSnapshot();

  const reset = useCallback(() => {
    setFile(null);
    setResult(null);
    mutation.reset();
  }, [mutation]);

  function handleOpenChange(value: boolean) {
    if (!value) reset();
    onOpenChange(value);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped?.name.endsWith(".xlsx")) setFile(dropped);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  }

  function handleSubmit() {
    if (!file) return;
    mutation.mutate(
      { file },
      {
        onSuccess: (data) => setResult(data),
      }
    );
  }

  const errorMessage =
    mutation.error instanceof ApiError
      ? mutation.error.status === 409
        ? "같은 날짜의 스냅샷이 이미 존재합니다."
        : mutation.error.message
      : mutation.error
        ? "업로드에 실패했습니다. 다시 시도해주세요."
        : null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>스냅샷 가져오기</DialogTitle>
        </DialogHeader>

        {result ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-positive" />
              <div className="min-w-0">
                <p className="text-sm font-medium">가져오기 완료</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(result.snapshot_date)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-xs text-muted-foreground">순자산</p>
                <p className="font-mono text-sm font-semibold">
                  {formatKRW(result.net_worth)}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-xs text-muted-foreground">총 자산</p>
                <p className="font-mono text-sm font-semibold">
                  {formatKRW(result.total_assets)}
                </p>
              </div>
            </div>
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              확인
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-muted-foreground/50"
            >
              {file ? (
                <>
                  <FileSpreadsheet className="h-8 w-8 text-positive" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    삭제
                  </Button>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      .xlsx 파일을 여기에 드래그하세요
                    </p>
                    <label className="mt-1 cursor-pointer text-sm font-medium text-primary hover:underline">
                      또는 파일 선택
                      <input
                        type="file"
                        accept=".xlsx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!file || mutation.isPending}
            >
              {mutation.isPending ? "가져오는 중..." : "가져오기"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
