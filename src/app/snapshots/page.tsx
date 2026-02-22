import type { Metadata } from "next";
import { SnapshotsDashboard } from "./snapshots-dashboard";

export const metadata: Metadata = {
  title: "Snapshots — Kubera",
};

export default function SnapshotsPage() {
  return <SnapshotsDashboard />;
}
