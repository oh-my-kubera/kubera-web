# kubera-web

Next.js dashboard connecting to a user's kubera-core backend. All data lives in the backend — web is a pure client.

```
app/        → pages and routing
components/ → UI components (shadcn/ui + custom)
hooks/      → custom React hooks
lib/        → API client, connection state, types, utilities
```

| Tech | Role |
|------|------|
| Next.js 14 (App Router) | Framework, routing, SSR/SSG |
| TailwindCSS + shadcn/ui | Styling, component primitives |
| TanStack Query v5 | Server state, caching, revalidation |
| Recharts | Charts and data visualization |
| openapi-typescript | Type generation from kubera-core spec |

## State management

- Server connection: localStorage (persists across sessions)
- API data: TanStack Query for caching + revalidation
- No global state library needed initially

## Shared code with native app

Web and the future native app (React Native) do not share code directly.
Both generate types independently from kubera-core's `openapi.json` (single source of truth) and follow the same design patterns.

## Deployment

Vercel project. Auto-deploys from GitHub on push. No environment variables needed — backend URL is provided at runtime by the user.

```bash
npm run build    # production build (prebuild generates types automatically)
npm run start    # local preview
```
