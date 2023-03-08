import Post from '@/components/Post'
import Profile from '@/components/Profile'
import { getPostMetadata } from '@/utils/posts'

export default function Home() {
  const posts = getPostMetadata()

  return (
    <div className='px-6'>
      <Profile />

      <article className='space-y-1 divide-y'>
        {posts.map((post) => (
          <Post
            key={post.slug}
            category={post.category}
            date={post.date}
            slug={post.slug}
            title={post.title}
            coverImage={post.coverImage}
          />
        ))}
      </article>
    </div>
  )
}
