# waksoccer — MVP Full-stack (Web + iOS/Android) with Stripe

A production-ready starter you can deploy now: Next.js 14 (App Router) web app with SEO (sitemap/robots, OpenGraph), Stripe Checkout + Webhooks, and an Expo (React Native) mobile app for iOS/Android. Data provider is pluggable (API-Football, football-data.org, or your own DB).

✅ Goals covered: live standings for the leagues you listed, Google search indexing, Stripe payouts to your bank, iOS & Play Store apps (via Expo).

## Monorepo Layout

```
waksoccer/
├─ apps/
│  ├─ web/                # Next.js 14 web (SSR)
│  └─ mobile/             # Expo React Native app
├─ packages/
│  ├─ ui/                 # Shared UI (buttons, cards, theme)
│  └─ core/               # Shared types, league map, fetchers
├─ infra/
│  └─ vercel.json         # Vercel config for web
├─ .gitignore
├─ package.json           # pnpm workspaces (recommended) or npm/yarn
└─ README.md
```

## How to Run Locally

```bash
# 1) Install deps
pnpm i

# 2) Env
cp .env.example apps/web/.env.local
cp .env.example apps/mobile/.env
# put your keys + URLs

# 3) Start web + mobile
cd apps/web && pnpm dev
# new terminal
cd apps/mobile && pnpm start
```

For real data you need an API key. Create one at API-Football (api-sports.io) or football-data.org and paste it in `.env.local`.

## Google Search Indexing Checklist (Web)

1. **Custom Domain**: point waksoccer.com → your Vercel project
2. **Sitemap**: /sitemap.xml is generated; submit in Google Search Console
3. **robots.txt**: we Allow all. Make sure site is not password-protected
4. **Page Speed**: keep images light; Next.js SSR already SEO-friendly
5. **Metadata**: set titles/descriptions per league for better keywords

## Stripe Payouts to Your Bank

1. In Stripe Dashboard → Settings → Bank accounts and scheduling: add your bank
2. Test mode first; then switch to Live keys
3. Attach Webhook to /api/stripe/webhook with the signing secret in env
4. You'll see Payments → Payouts moving to your bank based on Stripe's schedule

## Publishing Mobile Apps

1. Expo EAS: `npm i -g eas-cli` → `eas build -p ios` / `-p android`
2. Create Apple/Google developer accounts, follow Expo prompts
3. Set app icons, splash, and package IDs in app.json

## Optional Enhancements (when you're ready)

- Auth (Clerk/Supabase) to tie Stripe customers to users
- Caching: Cache standings 60–120s via Next.js revalidate or Edge cache
- Scores/Fixtures: Add endpoints fixtures/live, matches/{date} similarly
- Admin Dashboard: Simple route to feature leagues, post news, etc.
- Ads: Google AdSense or direct sponsorship slots on layout