import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getRawMDX, generateStaticParamsForPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';
import CusdisComments from '@/components/CusdisComments';

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
          loading="lazy"
          style={{ width: '100%', height: 'auto' }}
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
  if (!post) return { title: 'Article Not Found' };

  const url = `https://nukethefoids.fun/articles/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: 'NukeTheFoids.fun' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'NukeTheFoids.fun',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['NukeTheFoids.fun'],
      images: post.cover ? [
        {
          url: post.cover.startsWith('http') ? post.cover : `https://nukethefoids.fun${post.cover}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover ? [post.cover.startsWith('http') ? post.cover : `https://nukethefoids.fun${post.cover}`] : [],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const raw = getRawMDX(slug);
  if (!raw) {
    notFound();
  }

  const post = getPostBySlug(slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post?.title || slug,
    description: post?.excerpt || '',
    datePublished: post?.date || '',
    dateModified: post?.date || '',
    author: {
      '@type': 'Organization',
      name: 'NukeTheFoids.fun',
      url: 'https://nukethefoids.fun',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NukeTheFoids.fun',
      url: 'https://nukethefoids.fun',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nukethefoids.fun/logo.svg',
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nukethefoids.fun/articles/${slug}`,
    },
    image: post?.cover ? (post.cover.startsWith('http') ? post.cover : `https://nukethefoids.fun${post.cover}`) : undefined,
    wordCount: raw.split(/\s+/).length,
  };

  return (
    <>
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article className="article-page" itemScope itemType="https://schema.org/NewsArticle">
        {post?.cover && (
          <div className="article-cover">
            <Image
              src={post.cover}
              alt={post.title}
              width={1100}
              height={500}
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}
        <div className="container" style={{ maxWidth: '720px', padding: '2rem 1rem' }}>
          <nav aria-label="Breadcrumb" className="breadcrumb-nav">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep" aria-hidden="true">/</span>
            <Link href="/articles" className="breadcrumb-link">Articles</Link>
            <span className="breadcrumb-sep" aria-hidden="true">/</span>
            <span className="breadcrumb-current" aria-current="page">{post?.title}</span>
          </nav>
          <Link href="/articles" className="back-link">
            <i className="bi bi-arrow-left me-1" /> Back to Articles
          </Link>
          <time className="article-date" dateTime={post?.date} style={{ display: 'block', marginTop: '1rem' }} itemProp="datePublished">
            {post?.date && new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <h1 className="article-title" itemProp="headline">{post?.title}</h1>
          <div className="article-content" itemProp="articleBody">
            <MDXRemote source={raw} components={createMDXComponents()} />
          </div>
          <CusdisComments
            pageId={slug}
            pageUrl={`https://nukethefoids.fun/articles/${slug}`}
            pageTitle={post?.title || slug}
          />
        </div>
      </article>
    </>
  );
}
