# AGENTS.md

Guidelines for agentic coding agents working on **rentia-frontend** (`homy-real-estate` in `package.json`) — the public real-estate listings site, Next.js 16 + React 19. See the root `AGENTS.md` for the wider Rentia workspace.

## Commands

```bash
pnpm run dev                  # next dev --webpack (Turbopack explicitly not used)
pnpm run build                # next build --webpack
pnpm run start
pnpm run lint                 # eslint src --ext .ts,.tsx,.js,.jsx
pnpm run generate-sitemap     # node scripts/generate-sitemap.js
pnpm run smoke:image-loader   # node scripts/smoke-image-loader.mjs
```

Use `pnpm` — there's a stray `package-lock.json` alongside `pnpm-lock.yaml`; ignore it.

## Project structure

```
src/app/          # App Router — includes dozens of demo route variants
                    # (listing_01..17, home-two..eight, project_01..04, etc.)
                    # inherited from the "Homy" real-estate template this was
                    # built on. Confirm with the team which routes are live
                    # in production before editing or deleting one that looks
                    # unused — it may just be unlinked template scaffolding.
src/components/ src/data/ src/redux/ src/services/api/
```

## Env vars

Client-exposed (`NEXT_PUBLIC_*`): `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_BASE_URL_REMOTE`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_SITE_URL`.
Server-only: `REVALIDATE_SECRET` (ISR revalidation endpoint), `FB_APP_ID`. Never move a server-only var into a `NEXT_PUBLIC_*` name.

## Notes

- `process.env.VERCEL` is checked in code — verify with the team whether this actually deploys via Vercel or via the VPS (`scripts/deploy.sh`, used by the other Rentia services) before assuming either.
