import { getCategories } from '@/utils/post'

import categoryUrls from '../constants/category'
import Category from './Category'

type CategoryListProps = {
  path: string
}

export default function CategoryList({ path }: CategoryListProps) {
  const categories = getCategories()

  return (
    <div className='flex flex-wrap gap-2'>
      <Category category='전체보기' path='/' active={path === '/'} />
      {categories.map((category) => (
        <Category
          key={category}
          category={categoryUrls[category]}
          path={category}
          active={path === category}
        />
      ))}
    </div>
  )
}
