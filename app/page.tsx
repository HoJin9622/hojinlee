import Profile from '@/components/Profile'
import { getPostMetadata } from '@/utils/posts'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const posts = getPostMetadata()

  return (
    <div className='px-6'>
      <Profile />

      <article className='space-y-1 divide-y'>
        {posts.map((post) => (
          <Link className='block' href={`/posts/${post.slug}`} key={post.slug}>
            <div className='py-4'>
              <p className='text-sm'>
                {post.category} ·{' '}
                <span className='text-gray-500'>{post.date}</span>
              </p>
              <div className='flex gap-6 mt-3 md:gap-14'>
                <h2 className='font-bold text-base flex-1 md:text-xl'>
                  {post.title}
                </h2>
                {post.coverImage && (
                  <Image
                    className='w-20 h-14 object-cover rounded-sm md:w-28 md:h-28'
                    src={post.coverImage}
                    width={80}
                    height={56}
                    alt='thumbnail'
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </article>
    </div>
  )
}
