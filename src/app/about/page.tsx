import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about NukeTheFoids.fun - our mission, values, and the team behind the news coverage and analysis.',
  alternates: {
    canonical: 'https://nukethefoids.fun/about',
  },
  openGraph: {
    title: 'About | NukeTheFoids.fun',
    description: 'Learn more about NukeTheFoids.fun - our mission, values, and the team behind the news coverage and analysis.',
    url: 'https://nukethefoids.fun/about',
    siteName: 'NukeTheFoids.fun',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nukethefoids.fun/logo.png',
        width: 512,
        height: 512,
        alt: 'NukeTheFoids.fun logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'About | NukeTheFoids.fun',
    description: 'Learn more about NukeTheFoids.fun - our mission, values, and the team behind the news coverage and analysis.',
    images: ['https://nukethefoids.fun/logo.png'],
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
      '@id': 'https://nukethefoids.fun/#organization',
      name: 'NukeTheFoids.fun',
      url: 'https://nukethefoids.fun',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nukethefoids.fun/logo.png',
        contentUrl: 'https://nukethefoids.fun/logo.png',
        width: 512,
        height: 512,
        caption: 'NukeTheFoids.fun logo',
      },
      image: 'https://nukethefoids.fun/logo.png',
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
