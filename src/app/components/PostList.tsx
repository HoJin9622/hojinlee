import { getPosts } from '@/utils/post'

import categoryUrls from '../constants/category'
import Post from './Post'

export default function PostList() {
  const posts = getPosts()

  return (
    <article className='mt-5 space-y-1 divide-y'>
      {posts.map((post) => (
        <Post
          key={post.slug}
          category={categoryUrls[post.category]}
          date={post.date}
          slug={post.slug}
          title={post.title}
          subtitle={post.subtitle}
          coverImage={post.coverImage}
        />
      ))}
    </article>
  )
}
