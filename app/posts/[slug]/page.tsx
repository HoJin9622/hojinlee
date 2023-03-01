import Markdown from 'markdown-to-jsx'
import { getPostContent, getPostMetadata } from '@/utils/posts'

interface Props {
  params: { slug: string }
}

export default function PostPage({ params: { slug } }: Props) {
  const post = getPostContent(slug)

  return (
    <div>
      <h1 className='text-2xl'>{post.data.title}</h1>
      <article className='prose md:prose-lg lg:prose-xl'>
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  )
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata()
  return posts.map((post) => ({ slug: post.slug }))
}
