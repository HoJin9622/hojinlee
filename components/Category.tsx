import Link from 'next/link';
import React from 'react';

import categoryUrls from '@/constants/category';

type Props = {
  category: string;
  count: number;
};

export default function Category({ category, count }: Props) {
  return (
    <Link
      href={`/${category}`}
      className="px-2 py-1 border-2 rounded-2xl text-sm"
      key={category}
    >
      {categoryUrls[category]}({count})
    </Link>
  );
}
