import React from 'react';

import { getCategories } from '@/utils/posts';

import Category from './Category';

export default function Categories() {
  const categories = getCategories();

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(categories).map((category) => (
        <Category
          key={category}
          category={category}
          count={categories[category]}
        />
      ))}
    </div>
  );
}
