# Deployment

Parent: [ARCHITECTURE.md](ARCHITECTURE.md)

## Vercel

kubera-web is its own Vercel project. Auto-deploys from the kubera-web GitHub repo.

### Domain

Dedicated domain pointed to Vercel project. Custom domain is configured in Vercel project settings (Settings → Domains).

### Environment Variables (Vercel)

None required. The backend URL is provided at runtime by the user (QR/pairing/direct input), not at build time.

## Build

```bash
npm run build    # Next.js production build (includes type generation via prebuild)
npm run start    # Local preview
```

Vercel handles build + deploy automatically on push.
