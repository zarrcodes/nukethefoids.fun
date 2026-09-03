import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getRawMDX, generateStaticParamsForPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import Image from 'next/image';
import ScrollToTop from '@/components/ScrollToTop';

interface Props {
  params: Promise<{ slug: string }>;
}

function createMDXComponents() {
  return {
    img({ src, alt, ...props }: { src: string; alt?: string; [key: string]: any }) {
      if (!src) return null;
      return (
        <Image
          src={src}
          alt={alt || ''}
          width={720}
          height={400}
          sizes="(max-width: 720px) 100vw"
          style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
        />
      );
    },
  };
}

export async function generateStaticParams() {
  return generateStaticParamsForPosts();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Artikel Tidak Ditemukan' };

  const url = `https://nukethefoids.fun/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: 'Abdurrazzaq Mohammad Ibrahim' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['Abdurrazzaq Mohammad Ibrahim'],
      images: post.cover ? [post.cover] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover ? [post.cover] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const raw = getRawMDX(slug);
  if (!raw) {
    notFound();
  }

  const post = getPostBySlug(slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post?.title || slug,
    description: post?.excerpt || '',
    datePublished: post?.date || '',
    author: {
      '@type': 'Person',
      name: 'Abdurrazzaq Mohammad Ibrahim',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NukeTheFoids.fun',
      url: 'https://nukethefoids.fun',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nukethefoids.fun/blog/${slug}`,
    },
  };

  return (
    <>
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="article fade-in">
        <MDXRemote source={raw} components={createMDXComponents()} />
      </div>
    </>
  );
}
