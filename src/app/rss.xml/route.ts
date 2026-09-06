import { getPosts } from '@/lib/mdx';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = getPosts();
  const baseUrl = 'https://nukethefoids.fun';

  const items = posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/articles/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${post.slug}</guid>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>NukeTheFoids.fun</title>
    <description>News, Analysis &amp; Commentary from NukeTheFoids.fun</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
    <copyright>Copyright ${new Date().getFullYear()} NukeTheFoids.fun</copyright>
    <category>News</category>
    <category>Analysis</category>
    <category>Technology</category>
    <category>Culture</category>${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
