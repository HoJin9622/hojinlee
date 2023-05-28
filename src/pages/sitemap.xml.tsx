import { GetServerSideProps } from 'next';

import generateSitemap from '@/utils/generateSitemap';
import { getPosts } from '@/utils/posts';

function SiteMap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getPosts();

  const sitemap = generateSitemap(posts);

  res.setHeader('Content-Type', 'text/xml');

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
