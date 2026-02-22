import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpload } from "@/lib/api";
import { snapshotKeys } from "./use-snapshots";
import type { components } from "@/lib/types/core";

type SnapshotSummary = components["schemas"]["SnapshotSummaryResponse"];

interface ImportParams {
  file: File;
}

export function useImportSnapshot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file }: ImportParams) => {
      const formData = new FormData();
      formData.append("file", file);

      return apiUpload<SnapshotSummary>(
        "/api/v1/snapshots/import",
        formData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: snapshotKeys.all });
    },
  });
}
