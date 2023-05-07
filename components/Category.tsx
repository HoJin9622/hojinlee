import Link from 'next/link';
import React from 'react';

import categoryUrls from '@/constants/category';

type Props = {
  category: string;
  count: number;
  active: boolean;
};

export default function Category({ category, count, active }: Props) {
  return (
    <Link
      href={`/${category}`}
      className={`px-2 py-1 border-2 rounded-2xl text-sm ${
        active && 'bg-blue-200'
      }`}
      key={category}
    >
      {categoryUrls[category]}({count})
    </Link>
  );
}
