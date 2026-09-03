import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/mdx';

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

export default function PostCard({ post, compact }: PostCardProps) {
  return (
    <article className="card post-card border-0 bg-transparent" style={{ marginBottom: compact ? '1rem' : '2rem' }}>
      {post.cover && (
        <Link href={`/blog/${post.slug}`} className="text-decoration-none d-block" style={{ marginBottom: '0.75rem' }}>
          <Image
            src={post.cover}
            alt={post.title}
            width={720}
            height={400}
            sizes="(max-width: 720px) 100vw"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Link>
      )}
      <span className="text-muted" style={{ fontSize: '0.78rem' }}>
        {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
      </span>
      <h3 className={`fw-bold mt-1 ${compact ? 'h6 mb-1' : 'h4 mb-2'}`}>
        <Link href={`/blog/${post.slug}`} className="text-decoration-none">
          {post.title}
        </Link>
      </h3>
      <p className="text-secondary mb-1" style={{ fontSize: compact ? '0.85rem' : '0.92rem', lineHeight: '1.6' }}>
        {post.excerpt}
      </p>
      {!compact && post.tags.length > 0 && (
        <div className="d-flex gap-2 flex-wrap mt-1">
          {post.tags.map((tag) => (
            <span key={tag} className="tag bg-secondary bg-opacity-10 text-secondary">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}