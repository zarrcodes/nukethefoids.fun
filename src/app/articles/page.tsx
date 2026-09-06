import { getPosts, getAllTags } from '@/lib/mdx';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Read the latest articles, analysis, and commentary from NukeTheFoids.fun on current events, technology, and culture.',
  alternates: {
    canonical: 'https://nukethefoids.fun/articles',
  },
};

export default function ArticlesPage() {
  const posts = getPosts();
  const tags = getAllTags();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Articles',
    description: 'Read the latest articles, analysis, and commentary from NukeTheFoids.fun.',
    url: 'https://nukethefoids.fun/articles',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://nukethefoids.fun/articles/${post.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container" style={{ maxWidth: '1100px', padding: '2rem 1rem' }}>
        <h1 className="page-title">Articles</h1>
        <p className="page-subtitle">All articles from NukeTheFoids.fun</p>
        <ArticleList posts={posts} tags={tags} />
      </div>
    </>
  );
}
