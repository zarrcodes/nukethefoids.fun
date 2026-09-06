# NukeTheFoids.fun

News and analysis blog. Built with Next.js App Router, Bootstrap, and Local MDX.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Bootstrap 5.3 + Custom CSS
- **CMS / Content:** Local MDX / Markdown (stored in `/content`)
- **Hosting:** Vercel

## Project Structure

```
content/          # MDX article files
src/app/          # Next.js App Router (pages, layout, SEO)
src/components/   # UI components (Navbar, Footer, PostCard)
src/lib/          # MDX parser utilities
public/           # Static assets (images, robots.txt, favicon)
```

## Development

```bash
npm run dev
```

## Article Format

```yaml
---
title: "Article Title"
date: "YYYY-MM-DD"
excerpt: "Brief summary."
tags: ["Category"]
cover: "/blog/cover.jpg"
---
```

## SEO

- Metadata API with OpenGraph and Twitter Cards
- Canonical URLs on every page
- Schema.org structured data (WebSite, NewsArticle, CollectionPage, AboutPage)
- Dynamic sitemap at `/sitemap.xml`
- RSS feed at `/rss.xml`
- robots.txt

## Security

Security headers configured in `next.config.ts`:
- HSTS, X-Content-Type-Options, X-Frame-Options
- X-XSS-Protection, Referrer-Policy
- Permissions-Policy, X-DNS-Prefetch-Control
- poweredByHeader disabled
