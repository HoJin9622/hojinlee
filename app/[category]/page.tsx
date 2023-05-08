import React from 'react';

import PostList from '@/components/PostList';
import { getCategories, getCategoryPostMetadata } from '@/utils/posts';

type Props = {
  params: { category: string };
};

export default function Category({ params: { category } }: Props) {
  const posts = getCategoryPostMetadata(category);

  return <PostList posts={posts} />;
}

export const generateStaticParams = async () => {
  const categories = getCategories();
  return Object.keys(categories).map((category) => ({
    category,
  }));
};
