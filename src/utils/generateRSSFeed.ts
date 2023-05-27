import RSS, { FeedOptions } from 'rss';

import { getPostMetadata } from './posts';

export default async function generateRssFeed() {
  const siteUrl = 'http://localhost:3000';
  const posts = getPostMetadata();
  const feedOptions: FeedOptions = {
    title: "Jin's Tech Blog: 기술적 사고와 경험의 공유",
    description:
      "Jin's Tech Blog는 코드와 기술을 통해 생각하는 방법과 기술적인 사고를 공유하는 블로그입니다.",
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    image_url: `${siteUrl}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Jin`,
  };
  const feed = new RSS(feedOptions);
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.subtitle,
      url: `${siteUrl}/posts/${post.slug}`,
      date: post.date,
    });
  });
  return feed.xml({ indent: true });
  // fs.writeFileSync('../public/rss.xml', feed.xml({ indent: true }));
}
