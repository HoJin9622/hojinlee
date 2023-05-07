import React from 'react';

import { getCategories } from '@/utils/posts';

export default function Categories() {
  const categories = getCategories();

  return (
    <div>
      {Object.keys(categories).map((key) => (
        <div key={key}>
          {key}({categories[key]})
        </div>
      ))}
    </div>
  );
}
