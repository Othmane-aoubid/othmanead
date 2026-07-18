import { blogPosts, SITE_URL, EMAIL } from "@/lib/data";

export async function GET() {
  const items = blogPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/en/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/en/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map((t) => `<category><![CDATA[${t}]]></category>`).join("")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Othmane Aoubid — Full-Stack Developer & Cloud Engineer Blog</title>
    <link>${SITE_URL}</link>
    <description>Deep-dive articles on web development, cloud infrastructure, backend systems, DevOps, and system architecture by Othmane Aoubid.</description>
    <language>en-us</language>
    <managingEditor>${EMAIL} (Othmane Aoubid)</managingEditor>
    <webMaster>${EMAIL} (Othmane Aoubid)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/og-image.png</url>
      <title>Othmane Aoubid Blog</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
