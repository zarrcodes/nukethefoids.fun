'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/mdx';

interface ArticleListProps {
  posts: Post[];
  tags: string[];
}

const PER_PAGE = 6;

export default function ArticleList({ posts, tags }: ArticleListProps) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;

    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [posts, activeTag, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="articles-search">
        <i className="bi bi-search articles-search-icon" />
        <input
          type="text"
          className="articles-search-input"
          placeholder="Search topics or keywords..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search articles"
        />
        {search && (
          <button
            className="articles-search-clear"
            onClick={() => handleSearchChange('')}
            aria-label="Clear search"
          >
            <i className="bi bi-x" />
          </button>
        )}
      </div>

      {/* Categories */}
      {tags.length > 0 && (
        <div className="articles-tags">
          <button
            className={`articles-tag ${activeTag === null ? 'active' : ''}`}
            onClick={() => { setActiveTag(null); setPage(1); }}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`articles-tag ${activeTag === tag ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="articles-count">
        {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        {activeTag && <> in <strong>{activeTag}</strong></>}
        {search && <> matching &ldquo;{search}&rdquo;</>}
      </div>

      {/* Articles Grid */}
      {paginated.length > 0 ? (
        <div className="news-grid">
          {paginated.map((post) => (
            <Link key={post.slug} href={`/articles/${post.slug}`} className="text-decoration-none">
              <article className="news-card">
                {post.cover && (
                  <div className="news-card-image">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      width={400}
                      height={250}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                      loading="lazy"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                )}
                <div className="news-card-body">
                  <div className="news-card-meta">
                    <time className="article-date" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    {post.tags.length > 0 && (
                      <span className="news-card-tag">{post.tags[0]}</span>
                    )}
                  </div>
                  <h3 className="news-card-title">{post.title}</h3>
                  <p className="news-card-excerpt">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No articles found.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="articles-pagination" aria-label="Pagination">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            aria-label="Previous page"
          >
            <i className="bi bi-chevron-left" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`pagination-btn ${p === page ? 'active' : ''}`}
              onClick={() => setPage(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ))}

          <button
            className="pagination-btn"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            aria-label="Next page"
          >
            <i className="bi bi-chevron-right" />
          </button>
        </nav>
      )}
    </div>
  );
}
