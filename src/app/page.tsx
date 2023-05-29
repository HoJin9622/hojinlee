import React from 'react';

import CategoryList from '@/components/CategoryList';
import PostList from '@/components/PostList';
import Profile from '@/components/Profile';
import { getPosts } from '@/utils/posts';

export default function Home() {
  const posts = getPosts();

  return (
    <div className="px-6">
      <Profile />

      <CategoryList path="/" />

      <PostList posts={posts} />
    </div>
  );
}
