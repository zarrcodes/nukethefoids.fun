import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nukethefoids.fun'),
  title: {
    default: 'NukeTheFoids.fun | Abdurrazzaq Mohammad Ibrahim',
    template: '%s | NukeTheFoids.fun',
  },
  description: 'Catatan personal, ide, dan pemikiran Abdurrazzaq Mohammad Ibrahim seputar teknologi dan kehidupan.',
  authors: [{ name: 'Abdurrazzaq Mohammad Ibrahim' }],
  creator: 'Abdurrazzaq Mohammad Ibrahim',
  openGraph: {
    title: 'NukeTheFoids.fun',
    description: 'Personal blog Abdurrazzaq Mohammad Ibrahim.',
    url: 'https://nukethefoids.fun',
    siteName: 'NukeTheFoids.fun',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nukethefoids',
    creator: '@nukethefoids',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const stored = localStorage.getItem('theme');
                  if (stored) {
                    document.documentElement.setAttribute('data-bs-theme', stored);
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-bs-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-bs-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="container my-5 flex-grow-1" style={{ maxWidth: '720px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}