import { getPosts } from '@/utils/post'

import Post from './components/Post'

export default function Home() {
  const posts = getPosts()
  return (
    <main>
      <h3>Latest Posts</h3>
      {posts.map((post) => (
        <Post
          key={post.slug}
          coverImage={post.coverImage}
          slug={post.slug}
          subtitle={post.subtitle}
          title={post.title}
        />
      ))}
    </main>
  )
}
