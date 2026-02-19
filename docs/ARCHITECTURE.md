# Kubera Web — Architecture

Next.js dashboard that connects to a user's kubera-core backend.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Main dashboard — total assets, pie chart, trend line, recent transactions |
| `/connect` | Server connection — QR scan, pairing code, direct URL input |
| `/assets` | Asset detail — per-account balances, trend graphs (daily/monthly/yearly) |
| `/finance` | Bank/card transactions — tables, category chart, CSV upload |
| `/backtest` | Backtest runner — strategy select, parameter sliders, equity chart, metrics |
| `/strategy` | Strategy management — list, configure parameters |
| `/trading` | Live trading — running strategies, positions, orders, kill switch |

## Server Connection

The backend URL is not hardcoded. Users connect via:

1. **QR scan** — camera reads `{url, token}`, stores in localStorage
2. **Pairing code** — 4-digit code → fetches URL from Cloudflare Workers relay
3. **Direct input** — manual URL + token entry
4. **Recent connection** — auto-stored, one-click reconnect

All API calls use the stored server URL. See `lib/connection.ts`.

## API Client

- `lib/api.ts` — fetch wrapper that prepends stored server URL + auth token
- Types generated from kubera-core's `openapi.json` via openapi-typescript
- See [api-client.md](api-client.md) for generation workflow

## Shared Code (lib/)

Web and the future native app (React Native) do not share code directly.
Both clients generate types independently from kubera-core's `openapi.json` (single source of truth) and follow the same design patterns (api client, connection state).

## State Management

- Server connection: localStorage (persists across sessions)
- API data: TanStack Query for caching + revalidation
- No global state library needed initially