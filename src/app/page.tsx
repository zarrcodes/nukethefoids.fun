import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getPosts } from '@/lib/mdx';

export default function HomePage() {
  const posts = getPosts().slice(0, 4);

  return (
    <div>
      <section className="mb-5 pb-4 border-bottom border-secondary-subtle">
        <h1 className="fw-bold mb-2 h2">Abdurrazzaq Mohammad Ibrahim</h1>
        <p className="text-secondary lead fs-6">
          Selamat datang di <strong>NukeTheFoids.fun</strong>. Tempat saya mendokumentasikan catatan teknis, ide, proyek eksekusi, serta pemikiran seputar pengembangan perangkat lunak dan kehidupan sehari-hari.
        </p>
      </section>

      <section>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h5 fw-bold text-uppercase tracking-wider mb-0">Artikel Terbaru</h2>
          <Link href="/blog" className="btn btn-link text-decoration-none px-0">
            Lihat Semua Blog <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>
        <div className="d-flex flex-column gap-0">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
        {posts.length === 0 && (
          <div className="text-center py-5">
            <p className="text-secondary">Belum ada artikel. Silakan tulis yang pertama!</p>
            <Link href="/blog" className="btn btn-secondary mt-3">
              Lihat Semua Blog
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}