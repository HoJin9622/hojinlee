'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import textTransformer from '@/utils/textTransformer';

type Props = {
  category: string;
  count: number;
};

export default function Category({ category, count }: Props) {
  const searchParams = useSearchParams();

  return (
    <Link
      href={`/${textTransformer(category)}`}
      className={`px-2 py-1 border-2 rounded-2xl text-sm ${
        category === searchParams?.get('category') && 'bg-blue-200'
      }`}
      key={category}
    >
      {category}({count})
    </Link>
  );
}
