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
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<SnapshotSummary | null>(null);
  const mutation = useImportSnapshot();

  const reset = useCallback(() => {
    setFile(null);
    setPassword("");
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
      { file, password: password || undefined },
      {
        onSuccess: (data) => setResult(data),
      }
    );
  }

  const errorMessage =
    mutation.error instanceof ApiError
      ? mutation.error.status === 409
        ? "This snapshot date already exists."
        : mutation.error.message
      : mutation.error
        ? "Upload failed. Please try again."
        : null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Snapshot</DialogTitle>
        </DialogHeader>

        {result ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-positive" />
              <div className="min-w-0">
                <p className="text-sm font-medium">Import successful</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(result.snapshot_date)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-xs text-muted-foreground">Net Worth</p>
                <p className="font-mono text-sm font-semibold">
                  {formatKRW(result.net_worth)}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-xs text-muted-foreground">Total Assets</p>
                <p className="font-mono text-sm font-semibold">
                  {formatKRW(result.total_assets)}
                </p>
              </div>
            </div>
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Done
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
                    Remove
                  </Button>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Drag & drop your .xlsx file here
                    </p>
                    <label className="mt-1 cursor-pointer text-sm font-medium text-primary hover:underline">
                      or browse
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

            {/* Password */}
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Password (optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter if file is encrypted"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
              />
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
              {mutation.isPending ? "Importing..." : "Import"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
