import { getCategories } from '@/utils/posts'
import Link from 'next/link'

export default function Home() {
  const categories = getCategories()

  return (
    <nav className='px-3 py-4'>
      <h3 className='font-medium text-lg border-b-2 pb-1 mb-3'>카테고리</h3>
      <ul className='space-y-1'>
        {categories.map((category) => (
          <Link
            className='block'
            href={`/posts?category=${category}`}
            key={category}
          >
            <li className='text-base cursor-pointer'>- {category}</li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}
