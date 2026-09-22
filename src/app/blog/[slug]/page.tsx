import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getRawMDX, generateStaticParamsForPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';
import CusdisComments from '@/components/CusdisComments';

const SITE_URL = 'https://nukethefoids.fun';
const LOGO_URL = `${SITE_URL}/logo.png`;
const SITE_NAME = 'NukeTheFoids.fun';

interface Props {
  params: Promise<{ slug: string }>;
}

function createMDXComponents() {
  return {
    img({ src, alt }: { src: string; alt?: string }) {
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
  if (!post) return { title: 'Postingan Tidak Ditemukan' };

  const url = `${SITE_URL}/blog/${post.slug}`;
  const coverUrl = post.cover
    ? post.cover.startsWith('http')
      ? post.cover
      : `${SITE_URL}${post.cover}`
    : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: SITE_NAME }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: SITE_NAME,
      locale: 'id_ID',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [SITE_NAME],
      tags: post.tags,
      images: coverUrl
        ? [
            {
              url: coverUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: LOGO_URL,
              width: 1254,
              height: 1254,
              alt: `Logo ${SITE_NAME}`,
              type: 'image/png',
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: coverUrl ? [coverUrl] : [LOGO_URL],
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const raw = getRawMDX(slug);
  if (!raw) {
    notFound();
  }

  const post = getPostBySlug(slug);
  const url = `${SITE_URL}/blog/${slug}`;
  const coverUrl =
    post?.cover && post.cover.startsWith('http')
      ? post.cover
      : post?.cover
        ? `${SITE_URL}${post.cover}`
        : undefined;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post?.title || slug,
    description: post?.excerpt || '',
    datePublished: post?.date || '',
    dateModified: post?.date || '',
    inLanguage: 'id',
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        contentUrl: LOGO_URL,
        width: 1254,
        height: 1254,
        caption: `Logo ${SITE_NAME}`,
      },
      image: LOGO_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: coverUrl,
    wordCount: raw.split(/\s+/).length,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post?.title || slug,
        item: url,
      },
    ],
  };

  return (
    <>
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="article-page" itemScope itemType="https://schema.org/BlogPosting">
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
            <Link href="/" className="breadcrumb-link">Beranda</Link>
            <span className="breadcrumb-sep" aria-hidden="true">/</span>
            <Link href="/blog" className="breadcrumb-link">Blog</Link>
            <span className="breadcrumb-sep" aria-hidden="true">/</span>
            <span className="breadcrumb-current" aria-current="page">{post?.title}</span>
          </nav>
          <Link href="/blog" className="back-link">
            <i className="bi bi-arrow-left me-1" /> Kembali ke Blog
          </Link>
          <time className="article-date" dateTime={post?.date} style={{ display: 'block', marginTop: '1rem' }} itemProp="datePublished">
            {post?.date && new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <h1 className="article-title" itemProp="headline">{post?.title}</h1>
          <div className="article-content" itemProp="articleBody">
            <MDXRemote source={raw} components={createMDXComponents()} />
          </div>
          <CusdisComments
            pageId={slug}
            pageUrl={url}
            pageTitle={post?.title || slug}
          />
        </div>
      </article>
    </>
  );
}
