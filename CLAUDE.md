# kubera-web

## Build
- `npm run dev` / `npm run build` / `npm run lint`
- `npm run generate-types` to regenerate API types (runs automatically on prebuild)

## Rules
- Use `@/*` path alias (maps to `./src/*`)
- API calls must use `api<T>()` from `@/lib/api` — never raw fetch
- API types come from `npm run generate-types` — never define them manually
- Use `cn()` from `@/lib/utils` for Tailwind class merging
- Add shadcn/ui components via `npx shadcn@latest add <name>` (new-york style, lucide icons)
- Server components by default — add `"use client"` only when necessary
- Server state via TanStack Query — no global state library
- Backend URL is runtime input (localStorage), not an environment variable
- Web targets the latest openapi.json with no backward compatibility
- On connect, check core version and prompt update if below minimum required version
