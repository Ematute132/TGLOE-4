# TGLOE — Phase 1 scaffold

What's built: Home (Phone + PC layouts, same data), School (class list + class detail),
Calendar. Finances and Hermes are placeholder pages for Phase 2. Everything currently
reads from `lib/mockData.ts` — swap that for Supabase queries once you've run the schema.

## Run it locally

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

Open http://localhost:3000 — resize the window (or open on your phone) to see the
Phone vs. PC layout switch; it's pure CSS breakpoints (`md:`), no device detection JS.

## Wire up Supabase

1. Create a project at supabase.com if you haven't.
2. Paste `supabase/schema.sql` into the Supabase SQL editor and run it. This creates
   `courses`, `calendar_events`, `tasks`, `study_materials`, all scoped to the logged-in
   user via Row Level Security.
3. Add your project URL and anon key to `.env.local`.
4. Replace the imports from `lib/mockData` with real Supabase queries (`@supabase/supabase-js`
   is already in package.json) — start with `courses` on the School page since it's the
   simplest table, then move to `calendar_events` and `tasks`.
5. Auth is wired in (see below) — Google sign-in and email magic links, protected by
   middleware. Every table's RLS policy already checks `auth.uid()`.

## Auth setup

The code side is done (middleware, login page, callback route, sign-out button). What's
left is configuring your Supabase project in the dashboard:

1. **Enable email auth (magic link)** — Supabase Dashboard → Authentication → Providers →
   Email. It's on by default; just confirm "Confirm email" matches what you want (off is
   fine for a magic-link-only flow, since clicking the link is the confirmation).
2. **Enable Google OAuth** — Authentication → Providers → Google → toggle on. You'll need
   a Google OAuth Client ID/Secret:
   - Go to console.cloud.google.com → APIs & Services → Credentials → Create Credentials →
     OAuth client ID → Web application.
   - Authorized redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`
     (Supabase shows you this exact URL on the same Providers page).
   - Paste the resulting Client ID and Secret into the Supabase Google provider fields.
3. **Set your Site URL and Redirect URLs** — Authentication → URL Configuration:
   - Site URL: `http://localhost:3000` while developing, your Vercel URL once deployed.
   - Redirect URLs: add `http://localhost:3000/auth/callback` and, once deployed,
     `https://<your-vercel-domain>/auth/callback`.
4. That's it — `npm run dev`, hit any page, and you'll get bounced to `/login` since
   `middleware.ts` protects every route except `/login` and `/auth/callback`. Sign in with
   Google or request a magic link, land back on the page you were headed to.
5. Sign out via the small button in the top-right corner (posts to `/auth/signout`).

No new environment variables are needed beyond the `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` you already set — Supabase Auth uses the same project.

## Deploy

Push to a GitHub repo, import it into Vercel, add the two env vars from `.env.local` in
the Vercel project settings. That single deployment is what makes this reachable from
phone/Mac/PC — no separate builds needed. After the first deploy, go back to Supabase's
Auth → URL Configuration and add your real `https://<your-vercel-domain>/auth/callback`
to Redirect URLs, or Google/magic-link sign-in will redirect to the wrong place.

## Icons

`public/manifest.json` references `/icon-192.png` and `/icon-512.png` for the
install-to-homescreen icon — drop your own square PNGs at those paths (a simple wordmark
or the TGLOE crest, whatever you want as the app icon).

## What's next (in the order from the spec doc)

1. Canvas API connection → live grades/assignments
2. Google Calendar/Gmail connections
3. Plaid → Finances page goes live
4. Hermes service on the Mac Mini, chat boxes point to it instead of being stubs
5. iMessage integration folded into Hermes last
