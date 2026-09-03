<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Context & Rules - NukeTheFoids.fun

## Project Overview
This is a clean, minimal, and ultra-fast personal blog built for **Abdurrazzaq Mohammad Ibrahim**.
- **Domain/Brand:** NukeTheFoids.fun
- **Language:** Indonesian (Bahasa Indonesia)

## Tech Stack
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Bootstrap (Custom CSS variables, Monochrome Dark/Light mode)
- **CMS / Content:** Local MDX / Markdown (stored in `/content`)
- **Icons:** Bootstrap Icons

## UI/UX Guidelines
1. **Monochrome Theme:** Pure white/black high-contrast design. No heavy accent colors.
2. **Typography & Readability:** Max width `720px` for text containers, comfortable line-height for long reading.
3. **Component Architecture:** Keep code modular. UI elements must go into `src/components/`, pages in `src/app/`.

## SEO Requirements
- Every page/post must maintain 100% SEO optimization.
- Always implement Next.js `metadata` API, OpenGraph tags, dynamic sitemap compatibility, and Schema.org structured data where applicable.

## Rules for AI Agent
- Do NOT use Tailwind CSS. Only use Bootstrap classes or native CSS in `globals.css`.
- Always respond in Bahasa Indonesia when explaining concepts or code changes.
- Keep dependencies as minimal as possible.


