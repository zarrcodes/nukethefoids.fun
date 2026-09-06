import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nukethefoids.fun'),
  title: {
    default: 'NukeTheFoids.fun - News & Analysis',
    template: '%s | NukeTheFoids.fun',
  },
  description: 'NukeTheFoids.fun delivers in-depth news coverage, analysis, and commentary on current events, technology, and culture.',
  keywords: ['news', 'analysis', 'commentary', 'technology', 'culture', 'current events'],
  authors: [{ name: 'NukeTheFoids.fun' }],
  creator: 'NukeTheFoids.fun',
  publisher: 'NukeTheFoids.fun',
  openGraph: {
    title: 'NukeTheFoids.fun - News & Analysis',
    description: 'In-depth news coverage, analysis, and commentary on current events, technology, and culture.',
    url: 'https://nukethefoids.fun',
    siteName: 'NukeTheFoids.fun',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nukethefoids.fun/logo.svg',
        width: 600,
        height: 60,
        alt: 'NukeTheFoids.fun',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nukethefoids',
    creator: '@nukethefoids',
    title: 'NukeTheFoids.fun - News & Analysis',
    description: 'In-depth news coverage, analysis, and commentary on current events, technology, and culture.',
    images: ['https://nukethefoids.fun/logo.svg'],
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
  alternates: {
    canonical: 'https://nukethefoids.fun',
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'NukeTheFoids.fun RSS Feed' },
      ],
    },
  },
  verification: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-bs-theme="light">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
