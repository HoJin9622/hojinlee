import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  slug: string;
  category: string;
  date: string;
  title: string;
  subtitle: string;
  coverImage?: string;
};

export default function Post({
  slug,
  category,
  date,
  title,
  subtitle,
  coverImage,
}: Props) {
  return (
    <Link className="block" href={`/posts/${slug}`} key={slug}>
      <div className="py-4 flex gap-6">
        <div className="flex-1">
          <h2 className="font-bold text-base md:text-xl flex-1 mb-1 leading-snug">
            {title}
          </h2>
          <p className="text-sm md:text-base text-gray-500">{subtitle}</p>
          <div className="text-xs md:text-sm text-gray-400 mt-3">
            <span className="text-blue-700">{category}</span>
            {' · '}
            {date}
          </div>
        </div>
        {coverImage && (
          <Image
            className="w-20 h-14 object-cover rounded-sm md:w-28 md:h-28"
            src={coverImage}
            width={80}
            height={56}
            alt="thumbnail"
          />
        )}
      </div>
    </Link>
  );
}
