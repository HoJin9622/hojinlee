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
      className={`px-2 py-1 border-2 rounded-2xl text-sm ${
        active && 'bg-blue-200'
      }`}
      key={category}
    >
      {category}({count})
    </Link>
  );
}
