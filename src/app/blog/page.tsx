import { getPosts, getAllTags } from '@/lib/mdx';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';

const SITE_URL = 'https://nukethefoids.fun';
const LOGO_URL = `${SITE_URL}/logo.png`;
const SITE_NAME = 'NukeTheFoids.fun';
const PAGE_URL = `${SITE_URL}/blog`;
const PAGE_DESCRIPTION =
  'Baca postingan blog terbaru dari NukeTheFoids.fun: berita, analisis, dan komentar tentang peristiwa terkini, teknologi, dan budaya.';

export const metadata: Metadata = {
  title: 'Blog',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: 'id_ID',
    type: 'website',
    images: [
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
    card: 'summary',
    title: `Blog | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    images: [LOGO_URL],
  },
};

export default function BlogPage() {
  const posts = getPosts();
  const tags = getAllTags();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${PAGE_URL}#blog`,
    name: `Blog ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    inLanguage: 'id',
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
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      image: post.cover
        ? post.cover.startsWith('http')
          ? post.cover
          : `${SITE_URL}${post.cover}`
        : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container" style={{ maxWidth: '1100px', padding: '2rem 1rem' }}>
        <h1 className="page-title">Blog</h1>
        <p className="page-subtitle">Semua tulisan dari NukeTheFoids.fun</p>
        <ArticleList posts={posts} tags={tags} />
      </div>
    </>
  );
}
