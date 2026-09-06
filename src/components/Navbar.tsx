'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <Link href="/" className="header-brand" aria-label="NukeTheFoids.fun - Home">
          NukeTheFoids.fun
        </Link>
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={pathname === item.path ? 'active' : ''}
              aria-current={pathname === item.path ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
