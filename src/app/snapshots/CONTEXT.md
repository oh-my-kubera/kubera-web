# /snapshots pages

## Routes
- `/snapshots` — dashboard: summary cards, net worth trend chart, history list
- `/snapshots/[id]` — detail report: summary, asset allocation, investments, loans, insurance

## Data Flow
- Server components (page.tsx) provide metadata only
- Client components fetch data via TanStack Query hooks from `@/hooks/use-snapshots`
- Import uses `useImportSnapshot` mutation hook with `apiUpload()` for multipart file upload

## Patterns
- `snapshots-dashboard.tsx` owns the import modal open state
- `snapshot-detail.tsx` receives parsed `id: number` from the server page
- Empty sections are hidden in the detail view
- Summary cards are reused between dashboard (latest snapshot) and detail page
