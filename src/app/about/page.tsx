import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about NukeTheFoids.fun - our mission, values, and the team behind the news coverage and analysis.',
  alternates: {
    canonical: 'https://nukethefoids.fun/about',
  },
};

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NukeTheFoids.fun',
    description: 'Learn more about NukeTheFoids.fun - our mission, values, and the team behind the news coverage and analysis.',
    url: 'https://nukethefoids.fun/about',
    mainEntity: {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container" style={{ maxWidth: '720px', padding: '2rem 1rem' }}>
        <h1 className="page-title">About</h1>
        <div className="page-content">
          <p>NukeTheFoids.fun is an independent platform featuring raw, unfiltered commentary on internet culture, modern society, and taboo topics.
</p>
        </div>
      </div>
    </>
  );
}
