# hooks — Custom React hooks

All hooks are client-side. Two patterns: localStorage reactive state and TanStack Query data fetching.

## Connection hooks

- `use-connection.ts` — Reactive localStorage wrapper via `useSyncExternalStore`. Exposes `isConnected`, `save()`, `clear()`, `getRecent()`. Dispatches custom events so all components stay in sync.
- `use-health.ts` — Raw `fetch` health check (`GET /api/v1/health`). Used only by ConnectForm to test connections before saving.

## Data hooks (TanStack Query)

- `use-assets.ts` — `useAssetSummary()` fetches asset summary for Dashboard
- `use-snapshots.ts` — Snapshot list and detail queries
- `use-import-snapshot.ts` — File upload mutation for snapshot import

All data hooks use `api<T>()` from `@/lib/api` which reads server URL from localStorage.
