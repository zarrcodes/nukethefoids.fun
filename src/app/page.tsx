import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getPosts } from '@/lib/mdx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'NukeTheFoids.fun - In-depth news coverage, analysis, and commentary on current events, technology, and culture.',
  alternates: {
    canonical: 'https://nukethefoids.fun',
  },
};

export default function HomePage() {
  const posts = getPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 5);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NukeTheFoids.fun',
    url: 'https://nukethefoids.fun',
    description: 'In-depth news coverage, analysis, and commentary on current events, technology, and culture.',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://nukethefoids.fun/articles?q={search_term_string}',
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
          <p className="hero-tagline">Uncensored thoughts on Anythings!</p>
        </div>
      </section>

      <section className="container" style={{ maxWidth: '1100px', padding: '1.5rem 1rem' }}>
        <div className="section-header">
          <h2 className="section-title">Latest Articles</h2>
          <Link href="/articles" className="section-link">
            View All <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>

        {featured && (
          <Link href={`/articles/${featured.slug}`} className="text-decoration-none">
            <article className="featured-card">
              {featured.cover && (
                <div className="featured-image">
                  <img src={featured.cover} alt={featured.title} loading="eager" />
                </div>
              )}
              <div className="featured-body">
                <time className="article-date" dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
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
            <p>No articles yet.</p>
          </div>
        )}
      </section>
    </>
  );
}
