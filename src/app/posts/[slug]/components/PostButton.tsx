import Link from 'next/link'
import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type PostButtonProps = {
  slug: string
  title: string
  type: '이전' | '다음'
}

export default function PostButton({ slug, title, type }: PostButtonProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className='flex items-center gap-1 rounded-md p-2 text-sm font-medium hover:bg-gray-100 md:text-lg'
    >
      {type === '이전' && <FiChevronLeft />}
      {title}
      {type === '다음' && <FiChevronRight />}
    </Link>
  )
}
