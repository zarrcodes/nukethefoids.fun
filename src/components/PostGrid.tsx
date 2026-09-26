'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import type { TextPost } from '@/lib/posts';

interface PostGridProps {
  posts: TextPost[];
  categories: string[];
}

const PER_PAGE = 12;

export default function PostGrid({ posts, categories }: PostGridProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(PER_PAGE);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.caption.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  const shown = filtered.slice(0, visible);

  const pickCategory = (c: string | null) => {
    setActiveCategory(c);
    setVisible(PER_PAGE);
  };

  return (
    <div>
      {/* Search */}
      <div className="articles-search">
        <i className="bi bi-search articles-search-icon" />
        <input
          type="text"
          className="articles-search-input"
          placeholder="Cari postingan..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setVisible(PER_PAGE); }}
          aria-label="Cari postingan"
        />
        {search && (
          <button
            className="articles-search-clear"
            onClick={() => setSearch('')}
            aria-label="Hapus pencarian"
          >
            <i className="bi bi-x" />
          </button>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="articles-tags">
          <button
            className={`articles-tag ${activeCategory === null ? 'active' : ''}`}
            onClick={() => pickCategory(null)}
          >
            Semua
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`articles-tag ${activeCategory === c ? 'active' : ''}`}
              onClick={() => pickCategory(activeCategory === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <div className="articles-count">
        {filtered.length} postingan
        {activeCategory && <> dalam <strong>{activeCategory}</strong></>}
        {search && <> yang cocok dengan &ldquo;{search}&rdquo;</>}
      </div>

      {/* Grid — kartu TIDAK bisa diklik (ala imageboard) */}
      {shown.length > 0 ? (
        <>
          <div className="post-grid">
            {shown.map((post, idx) => (
              <article key={post.slug} className="post-card">
                {post.image && (
                  <div className="post-card-image">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 600px) 84px, 110px"
                      loading={idx < 2 ? undefined : 'lazy'}
                      priority={idx < 2}
                    />
                  </div>
                )}
                <div className="post-card-body">
                  <div className="news-card-meta">
                    <span className="news-card-tag">{post.category}</span>
                    {post.date && (
                      <time className="article-date" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </time>
                    )}
                  </div>
                  <h3 className="post-card-title">{post.title}</h3>
                  {post.caption && <p className="post-card-caption">{post.caption}</p>}
                </div>
              </article>
            ))}
          </div>
          {visible < filtered.length && (
            <div className="post-loadmore-wrap">
              <button className="btn-loadmore" onClick={() => setVisible((v) => v + PER_PAGE)}>
                Muat Lebih Banyak ({filtered.length - visible} lagi)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p>Tidak ada postingan ditemukan.</p>
        </div>
      )}
    </div>
  );
}
