import type { Metadata } from "next";
import { SnapshotDetail } from "./snapshot-detail";

export const metadata: Metadata = {
  title: "Snapshot Detail — Kubera",
};

export default function SnapshotDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  return <SnapshotDetail id={id} />;
}
