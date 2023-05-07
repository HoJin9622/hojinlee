import React from 'react';

import Categories from '@/components/Categories';
import Post from '@/components/Post';
import Profile from '@/components/Profile';
import { getCategories, getCategoryPostMetadata } from '@/utils/posts';
import textTransformer from '@/utils/textTransformer';

type Props = {
  params: { category: string };
};

export default function Category({ params: { category } }: Props) {
  const posts = getCategoryPostMetadata(category);

  return (
    <div className="px-6">
      <Profile />

      <Categories />

      <article className="space-y-1 divide-y">
        {posts.map((post) => (
          <Post
            key={post.slug}
            category={post.category}
            date={post.date}
            slug={post.slug}
            title={post.title}
            coverImage={post.coverImage}
          />
        ))}
      </article>
    </div>
  );
}

export const generateStaticParams = async () => {
  const categories = getCategories();
  return Object.keys(categories).map((category) => ({
    category: textTransformer(category),
  }));
};
