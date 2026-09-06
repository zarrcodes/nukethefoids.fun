import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
}

export function getPosts(): Post[] {
  const files = fs.readdirSync(contentDirectory);
  const posts = files
    .filter((file) => (file.endsWith('.mdx') || file.endsWith('.md')) && file !== 'README.md')
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, '');
      const raw = fs.readFileSync(path.join(contentDirectory, file), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        cover: data.cover || '',
      };
    })
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getRawMDX(slug: string): string | null {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const mdPath = path.join(contentDirectory, `${slug}.md`);

  let raw: string | null = null;
  if (fs.existsSync(filePath)) {
    raw = fs.readFileSync(filePath, 'utf-8');
  } else if (fs.existsSync(mdPath)) {
    raw = fs.readFileSync(mdPath, 'utf-8');
  }

  if (!raw) return null;
  const { content } = matter(raw);
  return content;
}

export function getAllTags(): string[] {
  const posts = getPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export async function generateStaticParamsForPosts() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
