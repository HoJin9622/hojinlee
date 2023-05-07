import React from 'react';

import { getCategories } from '@/utils/posts';

import Category from './Category';

type Props = {
  path: string;
};

export default function Categories({ path }: Props) {
  const categories = getCategories();

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(categories).map((category) => (
        <Category
          key={category}
          category={category}
          count={categories[category]}
          active={path === category}
        />
      ))}
    </div>
  );
}
