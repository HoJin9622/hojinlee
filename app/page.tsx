import { getCategories } from '@/utils/posts'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const categories = getCategories()

  return (
    <div className='px-6'>
      <div className='py-6'>
        <div className='flex items-center gap-5'>
          <Image
            className='rounded-full w-12 h-12'
            src='/images/avatar.png'
            width={48}
            height={48}
            alt='avatar'
          />
          <div>
            <div>이호진</div>
            <div>Software Developer</div>
          </div>
        </div>
      </div>
    </div>
    // <nav className='px-3 py-4'>
    //   <h3 className='font-medium text-lg border-b-2 pb-1 mb-3'>카테고리</h3>
    //   <ul className='space-y-1'>
    //     {categories.map((category) => (
    //       <Link
    //         className='block'
    //         href={`/posts?category=${category}`}
    //         key={category}
    //       >
    //         <li className='text-base cursor-pointer'>- {category}</li>
    //       </Link>
    //     ))}
    //   </ul>
    // </nav>
  )
}
