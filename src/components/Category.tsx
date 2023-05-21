import Link from 'next/link';
import React from 'react';

type Props = {
  category: string;
  path: string;
  count: number;
  active: boolean;
};

export default function Category({ category, path, count, active }: Props) {
  return (
    <Link
      href={path}
      className={`px-2 py-1 rounded-2xl text-sm ${
        active
          ? 'text-white bg-gray-600'
          : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
      }`}
      key={category}
    >
      {category}({count})
    </Link>
  );
}
