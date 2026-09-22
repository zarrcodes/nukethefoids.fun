import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getPosts } from '@/lib/mdx';
import { Metadata } from 'next';

const SITE_URL = 'https://nukethefoids.fun';
const LOGO_URL = `${SITE_URL}/logo.png`;
const SITE_NAME = 'NukeTheFoids.fun';
const SITE_DESCRIPTION =
  'NukeTheFoids.fun dibuat untuk menyalurkan isi pikiran saya. Semua yang kalian baca di website ini berdasarkan pemikiran sendiri, bukan dari data/sumber yang kredibel, dan kadang tidak bersumber. Harap maklum. Source: trust me.';

export const metadata: Metadata = {
  title: 'Beranda',
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} - Berita & Analisis`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
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
    title: `${SITE_NAME} - Berita & Analisis`,
    description: SITE_DESCRIPTION,
    images: [LOGO_URL],
  },
};

export default function HomePage() {
  const posts = getPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 5);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="hero-section">
        <div className="container" style={{ maxWidth: '1100px' }}>
          <h1 className="hero-brand">NukeTheFoids.fun</h1>
          <p className="hero-tagline">Web aneh, tidak kredibel, source : trust me.</p>
        </div>
      </section>

      <section className="container" style={{ maxWidth: '1100px', padding: '1.5rem 1rem' }}>
        <div className="section-header">
          <h2 className="section-title">Postingan Terbaru</h2>
          <Link href="/blog" className="section-link">
            Lihat Semua <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="text-decoration-none">
            <article className="featured-card">
              {featured.cover && (
                <div className="featured-image">
                  <img src={featured.cover} alt={featured.title} loading="eager" />
                </div>
              )}
              <div className="featured-body">
                <time className="article-date" dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
                <h2 className="featured-title">{featured.title}</h2>
                <p className="featured-excerpt">{featured.excerpt}</p>
              </div>
            </article>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="news-grid">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="empty-state">
            <p>Belum ada postingan.</p>
          </div>
        )}
      </section>
    </>
  );
}
