# app

App Router pages. Each route is a directory with `page.tsx`.

## Routes

| Route | Purpose | Data |
|-------|---------|------|
| `/` | Dashboard — total assets + category breakdown | `AssetSummary` API via ConnectionGuard |
| `/connect` | Server connection form (URL + token, test, save) | localStorage only |
| `/snapshots` | Snapshot list, import modal, trend chart | Snapshot APIs via ConnectionGuard |
| `/snapshots/[id]` | Single snapshot detail (summary, tables, charts) | Snapshot detail API |

## Patterns

- Server components by default; client components extracted as separate files (e.g. `dashboard.tsx`, `connect-form.tsx`)
- Data-dependent pages wrap content with `<ConnectionGuard>` to show connect CTA when disconnected
- `/connect` is the only page that must NOT use ConnectionGuard

## Providers

`providers.tsx` wraps the app with `QueryClientProvider`. Client component — uses `useState` to create a stable QueryClient instance.
