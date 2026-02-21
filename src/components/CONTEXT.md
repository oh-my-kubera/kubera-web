# components — Shared UI components

## Structure

| Directory | Purpose |
|-----------|---------|
| `ui/` | shadcn/ui primitives (button, dialog, input, label) |
| `layout/` | App shell (sidebar navigation) |
| `snapshots/` | Snapshot-specific components (list, charts, tables, import modal) |

## Key components

- `connection-guard.tsx` — Wraps page content; shows "Connect Server" CTA when disconnected, renders children when connected. Uses `useConnection()` hook.

## Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| UI library | shadcn/ui (new-york style) | Composable, no runtime, Tailwind-native |
| Icons | lucide-react | Consistent with shadcn defaults |
