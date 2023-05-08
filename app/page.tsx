import React from 'react';

import Categories from '@/components/Categories';
import Post from '@/components/Post';
import Profile from '@/components/Profile';
import categoryUrls from '@/constants/category';
import { getPostMetadata } from '@/utils/posts';

export default function Home() {
  const posts = getPostMetadata();

  return (
    <div className="px-6">
      <Profile />

      <Categories path="/" />

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
    </div>
  );
}
