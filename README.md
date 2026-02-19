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
| Framework | Next.js 14 (App Router) |
| Styling | TailwindCSS + shadcn/ui |
| Data fetching | TanStack Query v5 |
| Charts | Recharts |
| Type generation | openapi-typescript |

## Project Structure

```
src/
├── app/            # Pages (App Router)
├── components/     # UI components
├── hooks/          # Custom React hooks
└── lib/            # API client, connection, types
specs/              # Pinned kubera-core openapi.json
```

Dev documentation lives in co-located `CONTEXT.md` files next to the code they describe.

## License

MIT
