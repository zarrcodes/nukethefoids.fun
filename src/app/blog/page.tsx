import PostCard from '@/components/PostCard';
import { getPosts } from '@/lib/mdx';

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="fade-in">
      <h1 className="h2 fw-bold mb-1">Blog</h1>
      <p className="text-secondary mb-4">Semua catatan dan pemikiran yang sudah saya tulis.</p>
      <div className="d-flex flex-column gap-0">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <div className="text-center py-5">
          <p className="text-secondary">Belum ada artikel. Silakan tulis yang pertama!</p>
        </div>
      )}
    </div>
  );
}