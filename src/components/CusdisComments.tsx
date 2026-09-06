'use client';

import { useEffect, useRef } from 'react';

interface CusdisCommentsProps {
  pageId: string;
  pageUrl: string;
  pageTitle: string;
}

export default function CusdisComments({ pageId, pageUrl, pageTitle }: CusdisCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCusdis = async () => {
      if (!containerRef.current) return;

      const existingScript = document.querySelector('script[src="https://cusdis.com/js/cusdis.es.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://cusdis.com/js/cusdis.es.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    loadCusdis();
  }, []);

  return (
    <section className="comments-section">
      <h2 className="comments-title">Discussion</h2>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="b229006e-1f9b-420f-82cb-736125bcf053"
        data-page-id={pageId}
        data-page-url={pageUrl}
        data-page-title={pageTitle}
        ref={containerRef}
      />
    </section>
  );
}
