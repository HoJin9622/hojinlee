import { getCategories } from '@/utils/posts'
import Link from 'next/link'

export default function Home() {
  const categories = getCategories()

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <Link href={`/posts?category=${category}`} key={category}>
            <li>{category}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
