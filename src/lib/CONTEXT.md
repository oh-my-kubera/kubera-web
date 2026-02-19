# lib

Shared utilities, API layer, and generated types.

## API client (api.ts)

`api<T>(path, options)` — fetch wrapper that prepends stored server URL + Bearer token.
Throws `ApiError(status, body)` on non-ok responses.

## Connection state (connection.ts)

Manages server URL and auth token in localStorage.

- `getServerUrl()` / `getToken()` — read current connection
- `saveConnection(conn)` — persist and add to recent list
- `getRecentConnections()` — last 5 connections for quick reconnect

Web uses localStorage. The native app will follow the same pattern with SecureStore.

## Type generation

kubera-core's `openapi.json` is the single source of truth.

```bash
npm run generate-types   # specs/core-openapi.json → src/lib/types/core.d.ts
```

Runs automatically via `prebuild`. Types are committed (spec is pinned).

```typescript
import type { components } from '@/lib/types/core';
type Asset = components['schemas']['Asset'];
```

## Cross-repo contract

CI syncs `openapi.json` on kubera-core release. kubera-web stores a pinned copy in `specs/`.
