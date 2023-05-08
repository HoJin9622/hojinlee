import React from 'react';

import categoryUrls from '@/constants/category';
import { getCategories } from '@/utils/posts';

import Category from './Category';

type Props = {
  path: string;
};

export default function CategoryList({ path }: Props) {
  const categories = getCategories();

  const totalCount = Object.values(categories).reduce(
    (acc, val) => acc + val,
    0,
  );

  return (
    <div className="flex flex-wrap gap-2">
      <Category
        category="전체보기"
        path="/"
        count={totalCount}
        active={path === '/'}
      />
      {Object.keys(categories).map((category) => (
        <Category
          key={category}
          category={categoryUrls[category]}
          path={category}
          count={categories[category]}
          active={path === category}
        />
      ))}
    </div>
  );
}
