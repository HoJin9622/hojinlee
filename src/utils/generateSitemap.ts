const EXTERNAL_DATA_URL = 'https://devlog.nextlevels.net';

export default function generateSitemap(posts: Post[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
              <loc>${EXTERNAL_DATA_URL}</loc>
          </url>
        ${posts
          .map(
            ({ slug, date }) => `
          <url>
              <loc>${`${EXTERNAL_DATA_URL}/posts/${slug}`}</loc>
              <lastmod>${date}</lastmod>
              <priority>1.0</priority>
          </url>
        `,
          )
          .join('')}
      </urlset>
    `;
}
