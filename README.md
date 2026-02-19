# Kubera Web

Next.js dashboard for the Kubera personal asset management + quant trading platform.

Connects to a user's kubera-core backend server and provides a web UI for asset management, backtesting, and trading.

Deployed on Vercel with a dedicated domain.

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Tech Stack

| Component | Library |
|-----------|---------|
| Framework | Next.js |
| Styling | TailwindCSS |
| Charts | Recharts |
| Type generation | openapi-typescript |

## Project Structure

```
kubera-web/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── connect/page.tsx      # Server connection (QR/pairing/direct)
│   │   ├── assets/page.tsx       # Asset detail + trends
│   │   ├── finance/page.tsx      # Bank/card transactions
│   │   ├── backtest/page.tsx     # Backtest runner
│   │   ├── strategy/page.tsx     # Strategy management
│   │   └── trading/page.tsx      # Live trading monitor
│   ├── components/
│   │   ├── charts/
│   │   ├── tables/
│   │   └── layout/
│   └── lib/
│       ├── api.ts                # API client (dynamic server URL)
│       ├── connection.ts         # Server connection state (localStorage)
│       └── types/
│           └── core.d.ts         # Generated from kubera-core openapi.json
├── next.config.js
├── package.json
└── docs/
```

## Docs

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Frontend architecture, pages, state
- [deployment.md](docs/deployment.md) — Vercel setup, domain, build
- [api-client.md](docs/api-client.md) — Type generation, server connection

## License

MIT
