import React from 'react';

import Post from '@/components/Post';
import categoryUrls from '@/constants/category';
import { getCategories, getCategoryPostMetadata } from '@/utils/posts';

type Props = {
  params: { category: string };
};

export default function Category({ params: { category } }: Props) {
  const posts = getCategoryPostMetadata(category);

  return (
    <article className="space-y-1 divide-y">
      {posts.map((post) => (
        <Post
          key={post.slug}
          category={categoryUrls[post.category]}
          date={post.date}
          slug={post.slug}
          title={post.title}
          coverImage={post.coverImage}
        />
      ))}
    </article>
  );
}

export const generateStaticParams = async () => {
  const categories = getCategories();
  return Object.keys(categories).map((category) => ({
    category,
  }));
};
