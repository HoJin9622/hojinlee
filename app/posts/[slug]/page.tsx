import Markdown from 'markdown-to-jsx'
import { getPostContent, getPostMetadata } from '@/utils/posts'
import Image from 'next/image'

interface Props {
  params: { slug: string }
}

export default function PostPage({ params: { slug } }: Props) {
  const post = getPostContent(slug)

  return (
    <div className='px-6 mt-6'>
      <h1 className='text-3xl font-bold'>{post.data.title}</h1>
      <div className='text-sm text-gray-500'>{post.data.date}</div>

      <article className='prose mt-10'>
        {post.data.coverImage && (
          <div className='relative aspect-video'>
            <Image
              className='object-contain m-0'
              src={post.data.coverImage}
              alt='thumbnail'
              fill
            />
          </div>
        )}
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  )
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata()
  return posts.map((post) => ({ slug: post.slug }))
}
