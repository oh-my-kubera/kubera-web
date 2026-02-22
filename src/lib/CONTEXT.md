# lib

Shared utilities, API layer, and generated types.

## API client (api.ts)

`api<T>(path, options)` — fetch wrapper that prepends stored server URL + Bearer token.
`apiUpload<T>(path, formData, queryParams)` — multipart upload variant (no Content-Type header).
Both throw `ApiError(status, body)` on non-ok responses.

## Connection state (connection.ts)

Manages server URL and auth token in localStorage. SSR-safe with `typeof window` guards.

- `getServerUrl()` / `getToken()` — read current connection
- `saveConnection(conn)` — persist and add to recent list
- `getRecentConnections()` — last 5 connections for quick reconnect

## Utilities (utils.ts)

- `cn()` — Tailwind class merging (clsx + twMerge)
- `formatKRW()`, `formatPercent()`, `formatDate()` — display formatters

## Type generation

kubera-core's `openapi.json` is the single source of truth.

```bash
npm run generate-types   # specs/core-openapi.json → src/lib/types/core.d.ts
```

Runs automatically via `prebuild`. Types are committed (spec is pinned).

## Data flow

Connection form → `connection.ts` saves to localStorage → `api.ts` reads URL/token → hooks call `api<T>()` → components render data.
