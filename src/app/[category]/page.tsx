import { redirect } from 'next/navigation';
import React from 'react';

import PostList from '@/components/PostList';
import { getCategories, getPostFilteredByCategory } from '@/utils/posts';

type Props = {
  params: { category: string };
};

export default function Category({ params: { category } }: Props) {
  const posts = getPostFilteredByCategory(category);

  if (!posts.length) {
    redirect('/');
  }

  return <PostList posts={posts} />;
}

export const generateStaticParams = async () => {
  const categories = getCategories();
  return Object.keys(categories).map((category) => ({
    category,
  }));
};
