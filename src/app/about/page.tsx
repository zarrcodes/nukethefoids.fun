import { Metadata } from 'next';

const SITE_URL = 'https://nukethefoids.fun';
const LOGO_URL = `${SITE_URL}/logo.png`;
const SITE_NAME = 'NukeTheFoids.fun';
const PAGE_URL = `${SITE_URL}/about`;
const PAGE_DESCRIPTION =
  'NukeTheFoids.fun dibuat untuk menyalurkan isi pikiran saya — tidak kredibel, kadang tidak bersumber. Harap maklum. Source: trust me.';

export const metadata: Metadata = {
  title: 'Tentang',
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: `Tentang | ${SITE_NAME}`,
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
    title: `Tentang | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    images: [LOGO_URL],
  },
};

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${PAGE_URL}#page`,
    name: `Tentang ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    inLanguage: 'id',
    mainEntity: {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container" style={{ maxWidth: '720px', padding: '2rem 1rem' }}>
        <h1 className="page-title">Tentang</h1>
        <div className="page-content">
          <p>
            NukeTheFoids.fun dibuat untuk menyalurkan isi pikiran saya.
            Tentunya poin-poin atau hal yang kalian baca di website ini
            berdasarkan pemikiran sendiri, dan bukan dari data/sumber yang
            kredibel, dan kadang tidak bersumber. Harap maklum.
          </p>
          <p>
            Source : trust me.
          </p>
        </div>
      </div>
    </>
  );
}
