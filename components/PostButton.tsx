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
      className="flex flex-col items-end border-2 p-3 w-96 rounded-md border-blue-700 hover:bg-gray-100"
    >
      <div className="text-sm">{type}포스트</div>
      <div className="w-full text-lg truncate font-bold text-right">
        {title}
      </div>
    </Link>
  );
}
