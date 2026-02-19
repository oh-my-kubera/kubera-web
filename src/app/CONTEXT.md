# app

App Router pages. Each route is a directory with `page.tsx`.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Main dashboard — total assets, pie chart, trend line, recent transactions |
| `/connect` | Server connection — QR scan, pairing code, direct URL input |
| `/assets` | Asset detail — per-account balances, trend graphs (daily/monthly/yearly) |
| `/finance` | Bank/card transactions — tables, category chart, CSV upload |
| `/backtest` | Backtest runner — strategy select, parameter sliders, equity chart, metrics |
| `/strategy` | Strategy management — list, configure parameters |
| `/trading` | Live trading — running strategies, positions, orders, kill switch |

## Server connection

The backend URL is not hardcoded. Users connect via:

1. QR scan — camera reads `{url, token}`, stores in localStorage
2. Pairing code — 4-digit code fetches URL from Cloudflare Workers relay
3. Direct input — manual URL + token entry
4. Recent connection — auto-stored, one-click reconnect

## Providers

`providers.tsx` wraps the app with `QueryClientProvider`. Client component — uses `useState` to create a stable QueryClient instance.
