import { getPublishedTextPosts, getAllPostCategories } from '@/lib/posts';
import { Metadata } from 'next';
import PostGrid from '@/components/PostGrid';

const SITE_URL = 'https://nukethefoids.fun';
const LOGO_URL = `${SITE_URL}/logo.png`;
const SITE_NAME = 'NukeTheFoids.fun';
const PAGE_URL = `${SITE_URL}/post`;
const PAGE_DESCRIPTION =
  'Lihat postingan foto di NukeTheFoids.fun — gambar, caption, dan judul. Source: trust me.';

export const metadata: Metadata = {
  title: 'Post',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: `Post | ${SITE_NAME}`,
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
    title: `Post | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    images: [LOGO_URL],
  },
};

export default function PostPage() {
  const posts = getPublishedTextPosts();
  const categories = getAllPostCategories();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${PAGE_URL}#gallery`,
    name: `Post ${SITE_NAME}`,
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
    associatedMedia: posts
      .filter((p) => p.image)
      .map((p) => ({
        '@type': 'ImageObject',
        contentUrl: p.image.startsWith('http') ? p.image : `${SITE_URL}${p.image}`,
        name: p.title,
        caption: p.caption,
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container" style={{ maxWidth: '1100px', padding: '2rem 1rem' }}>
        <h1 className="page-title">Post</h1>
        <p className="page-subtitle">Foto, caption, dan judul — langsung lihat di sini</p>
        <PostGrid posts={posts} categories={categories} />
      </div>
    </>
  );
}
