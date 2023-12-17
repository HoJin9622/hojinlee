import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  slug: string
  category: string
  date: string
  title: string
  subtitle: string
  coverImage?: string
}

export default function Post({
  slug,
  category,
  date,
  title,
  subtitle,
  coverImage,
}: Props) {
  return (
    <Link className='block' href={`/posts/${slug}`} key={slug}>
      <div className='flex gap-6 py-4'>
        <div className='flex-1'>
          <h2 className='mb-1 flex-1 text-base font-bold leading-snug md:text-xl'>
            {title}
          </h2>
          <p className='text-sm text-gray-500 md:text-base'>{subtitle}</p>
          <div className='mt-3 text-xs text-gray-400 md:text-sm'>
            <span className='text-blue-700'>{category}</span>
            {' · '}
            {date}
          </div>
        </div>
        {coverImage && (
          <Image
            className='h-14 w-20 rounded-sm object-cover md:h-28 md:w-28'
            src={coverImage}
            width={80}
            height={56}
            alt='thumbnail'
          />
        )}
      </div>
    </Link>
  )
}
