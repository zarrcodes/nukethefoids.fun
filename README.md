# NukeTheFoids.fun - Personal Blog

Personal blog milik Abdurrazzaq Mohammad Ibrahim menggunakan Next.js App Router, Bootstrap, dan Local MDX.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Bootstrap 5.3 + Bootstrap Icons
- **CMS / Content:** Local MDX / Markdown (stored in `/content`)
- **Hosting:** Vercel

## Project Structure

```
content/          # Berisi file .mdx artikel blog
src/app/          # Next.js App Router (pages, layout, metadata SEO, sitemap)
src/components/   # Komponen UI terpisah (Navbar, Footer, PostCard, MDXContent)
src/lib/          # Utility pembaca file MDX dan parser
src/styles/       # Custom CSS / Overrides (globals.css)
public/blog/      # Folder untuk menyimpan gambar cover & inline image
```

## Image Storage

Semua gambar (cover, inline) disimpan di **`public/blog/`**. Referensi di frontmatter MDX:

```yaml
---
cover: "/blog/nama-file.jpg"
---
```

Di dalam artikel MDX:

```markdown
![Alt text](/blog/nama-file.jpg)
```

## Development

```bash
npm run dev
```

## Deploy on Vercel

Proyek ini siap deploy di Vercel. Connect repository dan Vercel akan otomatis mendeteksi Next.js config.

## Format Artikel MDX

Setiap artikel harus menggunakan format frontmatter berikut:

```yaml
---
title: "Judul Artikel"
date: "YYYY-MM-DD"
excerpt: "Ringkasan singkat artikel 1-2 kalimat."
tags: ["Teknologi", "Opini"]
cover: "/blog/cover-filename.jpg"
---
```

Tulis isi artikel menggunakan Markdown standar di bawah garis `---`.
