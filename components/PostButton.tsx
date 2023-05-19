import Link from 'next/link';
import React from 'react';

type Props = {
  slug: string;
  title: string;
  type: '이전' | '다음';
};

export default function PostButton({ slug, title, type }: Props) {
  return (
    <Link
      href={`/posts/${slug}`}
      className={`flex flex-col items-end border-2 rounded-md border-blue-700 p-1 hover:bg-gray-100 md:w-2/5 ${
        type === '다음' ? 'text-right' : 'text-left'
      }`}
    >
      <span className="w-full text-sm">{type}포스트</span>
      <span className="w-full text-lg truncate font-bold">{title}</span>
    </Link>
  );
}
