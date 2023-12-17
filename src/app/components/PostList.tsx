import { getPosts } from '@/utils/post'

import categoryUrls from '../constants/category'
import Post from './Post'

type PostListProps = {
  category?: string
}

export default function PostList({ category }: PostListProps) {
  const posts = getPosts(category)

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
