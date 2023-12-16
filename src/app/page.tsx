import Image from 'next/image'
import Link from 'next/link'

import { getPosts } from '@/utils/post'

export default function Home() {
  const posts = getPosts()
  return (
    <main>
      <h3>Latest Posts</h3>
      {posts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post.slug}>
          <Image src={post.coverImage} width={150} height={150} alt='' />
          <h4>{post.title}</h4>
          <div>{post.subtitle}</div>
        </Link>
      ))}
    </main>
  )
}
