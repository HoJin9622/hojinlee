import Link from 'next/link';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type Props = {
  slug: string;
  title: string;
  type: '이전' | '다음';
};

export default function PostButton({ slug, title, type }: Props) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="text-sm p-2 rounded-md font-medium flex items-center gap-1 hover:bg-gray-100 md:text-lg"
    >
      {type === '이전' && <FiChevronLeft />}
      {title}
      {type === '다음' && <FiChevronRight />}
    </Link>
  );
}
