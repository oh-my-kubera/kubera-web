# API Client

Parent: [ARCHITECTURE.md](ARCHITECTURE.md)

## Type Generation from kubera-core

kubera-core's FastAPI auto-generates an OpenAPI spec at `/openapi.json`.
kubera-web generates TypeScript types from this spec.

### Development (live fetch)

```bash
npx openapi-typescript http://localhost:8000/openapi.json -o src/lib/types/core.d.ts
```

### CI/Production (pinned spec)

1. kubera-core CI exports `openapi.json` on each release
2. kubera-web stores the spec (or fetches from release artifact)
3. Type generation runs as build step:

```json
// package.json
{
  "scripts": {
    "generate-types": "openapi-typescript specs/core-openapi.json -o src/lib/types/core.d.ts",
    "prebuild": "npm run generate-types"
  }
}
```

### Usage

```typescript
import type { components } from '@/lib/types/core';

type Asset = components['schemas']['Asset'];
type BacktestResult = components['schemas']['BacktestResult'];
type PortfolioSummary = components['schemas']['PortfolioSummary'];
```

## API Client (lib/api.ts)

```typescript
import { getServerUrl, getToken } from './connection';

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${getServerUrl()}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new ApiError(await res.json());
  return res.json();
}
```

## Connection State (lib/connection.ts)

```typescript
// Stored in localStorage
interface ServerConnection {
  url: string;    // "https://xyz.trycloudflare.com" or "http://localhost:8000"
  token: string;  // API auth token
}

function getServerUrl(): string { /* read from localStorage */ }
function getToken(): string { /* read from localStorage */ }
function saveConnection(conn: ServerConnection): void { /* write to localStorage */ }
function getRecentConnections(): ServerConnection[] { /* history */ }
```
