# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Public-facing web app for filing and tracking citizen complaints ("denuncias") for the Ministerio Público Fiscal de la C.A.B.A. (Buenos Aires). Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4. UI text is in Spanish.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build (output: 'standalone')
npm run start    # serve the production build
npm run lint     # next lint (eslint-config-next, core-web-vitals)
```

There is no test suite configured.

## Environment

Copy `.env.example` to `.env.local` and fill in. Nothing runs without these — there is no mock layer. Key groups:

- `MPFAPI_URL` / `KIWIAPI_URL` — backend complaint APIs (server-only; see `src/lib/mpfapi.ts`).
- `NEXT_PUBLIC_USIG_API_URL` — Buenos Aires address normalization/geocoding (USIG).
- `GOOGLE_RECAPTCHA_SECRET_KEY` / `NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` — reCAPTCHA v3, verified on every mutating endpoint.
- `NEXT_PUBLIC_GOOGLE_MAP_ID` — Google Maps marker for location selection.
- `SMTP_*` — nodemailer confirmation emails (`src/lib/mail.ts`).
- `LEYIA_ENABLED`, `LANGFLOW_*`, `NEXT_PUBLIC_N8N_*`, `NEXT_PUBLIC_NUBAX_*` — optional LeyIA chatbot integrations (Langflow embed / n8n webhook).
- `NEXT_PUBLIC_MATOMO_*` — analytics.

All env access is centralized in `src/lib/config.ts` via the exported `CONFIG` object — read/add env vars there rather than calling `process.env` directly elsewhere.

## Architecture

### i18n routing
Every page lives under `src/app/[lang]/`. Locales are `es` (default), `en`, `br`, defined in `src/lib/i18n.ts`. `src/middleware.ts` redirects any locale-less path to the default locale (note: it currently forces `es` rather than negotiating from `Accept-Language`). Translations are full JSON dictionaries in `src/dictionaries/{es,en,br}.json`, loaded server-side via `getDictionary(locale)` in `src/lib/dictionary.ts`. The `Dictionary` interface in that file is the source of truth for dictionary shape — when adding a UI string, update the interface **and** all three JSON files. The dictionary object is passed down through Server Components into Client Components as a prop.

### Server Components → Client Components pattern
Pages (`page.tsx`) are async Server Components that fetch dictionaries and backend reference data (e.g. nationalities from `mpfapi`), then render a `page-client.tsx` Client Component with that data as props. The complaint form (`src/app/[lang]/denuncia/ahora/`) is split into section components under `sections/` (`hecho`, `denunciante`, `denunciado`) and submitted via a React `useActionState` server action.

### Backend integration boundary
`src/lib/mpfapi.ts` is the single wrapper around the MPF/Kiwi backend: `ingresarDenuncia` (POST a complaint), `consultarDenuncia` (status lookup), `nacionalidades` (cached 15 days). `armarRequest(values)` is the critical mapper that flattens the flat `FormData` from the form into the nested `personas`/complaint payload the backend expects, including base64-encoding uploaded files. Field names in the form, the `Dictionary` placeholders, and `armarRequest`'s destructuring must stay in sync.

### Two submission paths (both exist)
- **Server action** — `src/actions/enviar-denuncia.ts` (`enviarDenunciaAction`), used by the form via `useActionState`.
- **API routes** — `src/app/api/denuncia*/route.ts` (`denuncia`, `denuncia-consulta`, `denuncia-descarga`, `denuncia-email`).

Both verify reCAPTCHA before doing anything. File uploads can be large, so `next.config.mjs` raises `serverActions.bodySizeLimit` to `100mb` — keep that in mind when touching the upload flow.

### Path alias
`@/*` maps to `src/*` (see `tsconfig.json`). TypeScript is in `strict` mode.

### Responsive styling
Single source of global responsive rules is `src/app/globals.css`; the `ultra-wide-type` class on `<body>` in `[lang]/layout.tsx` activates ≥2560px typography scaling. See `GUIA_RESPONSIVE.md`.

## Deployment
Multi-stage `Dockerfile` builds the Next.js `standalone` output; `.gitlab-ci.yml` builds and pushes the image (GitLab CI, single `build_and_push` stage). Main branch for PRs is `develop`.
