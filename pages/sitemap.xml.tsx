import { getPostMetadata, PostMetadata } from '@/utils/posts'
import { GetServerSideProps } from 'next'

const EXTERNAL_DATA_URL = 'https://devlog.nextlevels.net'

function generateSiteMap(posts: PostMetadata[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${EXTERNAL_DATA_URL}</loc>
        </url>
      ${posts
        .map(({ slug }) => {
          return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/posts/${slug}`}</loc>
        </url>
      `
        })
        .join('')}
    </urlset>
  `
}

function SiteMap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getPostMetadata()

  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')

  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
