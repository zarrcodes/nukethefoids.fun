<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Context & Rules - NukeTheFoids.fun

## Project Overview
News and analysis blog. Built for **NukeTheFoids.fun**.
- **Brand:** NukeTheFoids.fun
- **Language:** English

## Tech Stack
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Bootstrap (Custom CSS, White theme with black accents)
- **CMS / Content:** Local MDX / Markdown (stored in `/content`)
- **Icons:** Bootstrap Icons

## UI/UX Guidelines
1. **Theme:** Pure white background, black accents. No dark mode.
2. **Typography:** Sans-serif, clean, BBC-style news layout.
3. **Component Architecture:** Modular. UI in `src/components/`, pages in `src/app/`.

## SEO Requirements
- Every page/post must have 100% SEO optimization.
- Always implement Next.js `metadata` API, OpenGraph tags, canonical URLs, structured data (Schema.org).
- Every page needs: title, description, canonical URL, OpenGraph, Twitter Card.
- Every article needs: NewsArticle schema, author, publisher, datePublished, dateModified.
- Sitemap at `/sitemap.xml`, RSS feed at `/rss.xml`.

## Security Headers
Configured in `next.config.ts`:
- Strict-Transport-Security (HSTS)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: restricted
- X-DNS-Prefetch-Control: on
- poweredByHeader: false

## Rules for AI Agent
- Do NOT use Tailwind CSS. Only use Bootstrap classes or native CSS in `globals.css`.
- Always respond in English when explaining concepts or code changes.
- Keep dependencies as minimal as possible.
- All text must be in English.
- Always use semantic HTML (article, nav, main, header, footer, time, etc.).
