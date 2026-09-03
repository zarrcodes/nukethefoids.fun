'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tentang', path: '/tentang' },
  ];

  return (
    <nav className="navbar navbar-expand border-bottom border-secondary-subtle sticky-top bg-body py-3">
      <div className="container" style={{ maxWidth: '720px' }}>
        <Link href="/" className="navbar-brand fw-bold fs-5 text-decoration-none">
          NukeTheFoids.fun
        </Link>
        <div className="navbar-nav ms-auto gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link px-0 ${isActive ? 'fw-bold text-body border-bottom border-2 border-body' : 'text-secondary'}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}