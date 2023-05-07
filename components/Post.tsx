import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  slug: string;
  category: string;
  date: string;
  title: string;
  coverImage?: string;
};

export default function Post({
  slug,
  category,
  date,
  title,
  coverImage,
}: Props) {
  return (
    <Link className="block" href={`/posts/${slug}`} key={slug}>
      <div className="py-4">
        <p className="text-sm">
          {category}
          {' · '}
          <span className="text-gray-500">{date}</span>
        </p>
        <div className="flex gap-6 mt-3 md:gap-14">
          <h2 className="font-bold text-base flex-1 md:text-xl">{title}</h2>
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
      </div>
    </Link>
  );
}
