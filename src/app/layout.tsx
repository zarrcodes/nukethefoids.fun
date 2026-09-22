import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';

const SITE_URL = 'https://nukethefoids.fun';
const LOGO_URL = `${SITE_URL}/logo.png`;
const LOGO_WIDTH = 1254;
const LOGO_HEIGHT = 1254;
const SITE_NAME = 'NukeTheFoids.fun';
const SITE_DESCRIPTION =
  'NukeTheFoids.fun menyajikan berita mendalam, analisis tajam, dan komentar tentang peristiwa terkini, teknologi, dan budaya dalam Bahasa Indonesia.';
const SITE_TAGLINE = 'Berita mendalam, analisis tajam, dan komentar tanpa basa-basi.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NukeTheFoids.fun - Berita & Analisis',
    template: '%s | NukeTheFoids.fun',
  },
  description: SITE_DESCRIPTION,
  keywords: ['berita', 'analisis', 'komentar', 'teknologi', 'budaya', 'peristiwa terkini', 'blog indonesia', 'berita indonesia'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'berita',
  icons: {
    icon: [
      { url: '/logo.png', sizes: '1254x1254', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'NukeTheFoids.fun - Berita & Analisis',
    description: SITE_TAGLINE,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: LOGO_URL,
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
        alt: `Logo ${SITE_NAME}`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@nukethefoids',
    creator: '@nukethefoids',
    title: 'NukeTheFoids.fun - Berita & Analisis',
    description: SITE_TAGLINE,
    images: [LOGO_URL],
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
    canonical: SITE_URL,
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'Feed RSS NukeTheFoids.fun' },
      ],
    },
  },
  other: {
    'og:logo': LOGO_URL,
  },
  verification: {},
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: {
    '@type': 'ImageObject',
    '@id': `${LOGO_URL}#logo`,
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    caption: `Logo ${SITE_NAME}`,
  },
  image: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-bs-theme="light">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/logo.png" sizes="1254x1254" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="logo" type="image/png" href="/logo.png" />
        <link rel="preload" as="image" href="/logo.png" type="image/png" fetchPriority="high" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:logo" content="https://nukethefoids.fun/logo.png" />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
