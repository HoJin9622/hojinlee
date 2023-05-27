import { GetServerSideProps } from 'next';

import generateRssFeed from '@/utils/generateRSSFeed';

function Rss() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const rss = await generateRssFeed();

  res.setHeader('Content-Type', 'text/xml');

  res.write(rss);
  res.end();

  return {
    props: {},
  };
};

export default Rss;
