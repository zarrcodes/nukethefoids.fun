# 📝 Format Artikel MDX

Semua artikel disimpan di folder ini sebagai file `.mdx` atau `.md`.

## Frontmatter

Setiap artikel harus memiliki frontmatter YAML di bagian atas:

```yaml
---
title: "Judul Artikel"
date: "YYYY-MM-DD"
excerpt: "Ringkasan singkat artikel 1-2 kalimat."
tags: ["Teknologi", "Opini"]
cover: "/blog/cover-filename.jpg"
---
```

- `cover` → opsional. Foto disimpan di `public/blog/`. Referensi sebagai `/blog/nama-file.jpg`
- `tags` → opsional. Array string.

## Isi Artikel

Tulis menggunakan Markdown standar di bawah frontmatter. Bisa sisipkan gambar inline:

```markdown
![Alt teks](/blog/nama-gambar.jpg)
```

## Contoh File

Lihat `perkenalan.mdx` sebagai pola penulisan artikel, atau buat file baru:

```bash
content/
├── perkenalan.mdx
└── README.md
```
