import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface TextPost {
  slug: string;
  title: string;
  caption: string;
  image: string;
  category: string;
  date: string;
  status: string;
}

function readPostsDir(): TextPost[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => (file.endsWith('.mdx') || file.endsWith('.md')) && file !== 'README.md')
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, '');
      const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        caption: data.caption || '',
        image: data.image || '',
        category: data.category || 'Umum',
        date: data.date || '',
        status: data.status || 'published',
      };
    })
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
}

/** Semua postingan (termasuk draft) — untuk CMS/internal. */
export function getAllTextPosts(): TextPost[] {
  return readPostsDir();
}

/** Hanya yang published — untuk halaman publik. */
export function getPublishedTextPosts(): TextPost[] {
  return readPostsDir().filter((p) => p.status !== 'draft');
}

export function getAllPostCategories(): string[] {
  const set = new Set<string>();
  readPostsDir().forEach((p) => {
    if (p.category) set.add(p.category);
  });
  return Array.from(set).sort();
}
