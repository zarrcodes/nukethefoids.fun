import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/mdx';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/articles/${post.slug}`} className="text-decoration-none">
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
          <time className="article-date" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <h3 className="news-card-title">{post.title}</h3>
          <p className="news-card-excerpt">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
