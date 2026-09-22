import { getPosts } from '@/lib/mdx';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = getPosts();
  const baseUrl = 'https://nukethefoids.fun';

  const escapeXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const items = posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
      ${post.cover ? `<enclosure url="${post.cover.startsWith('http') ? post.cover : `${baseUrl}${post.cover}`}" type="image/jpeg" />` : ''}
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>NukeTheFoids.fun - Berita &amp; Analisis</title>
    <description>Tulisan-tulisan dari NukeTheFoids.fun — tidak kredibel, kadang tidak bersumber. Source: trust me.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>NukeTheFoids.fun</generator>
    <copyright>Hak cipta ${new Date().getFullYear()} NukeTheFoids.fun</copyright>
    <category>Berita</category>
    <category>Analisis</category>
    <category>Teknologi</category>
    <category>Budaya</category>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>NukeTheFoids.fun - Berita &amp; Analisis</title>
      <link>${baseUrl}</link>
      <width>1254</width>
      <height>1254</height>
    </image>${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
