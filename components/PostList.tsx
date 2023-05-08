import React from 'react';

import categoryUrls from '@/constants/category';
import { PostMetadata } from '@/utils/posts';

import Post from './Post';

type Props = {
  posts: PostMetadata[];
};

export default function PostList({ posts }: Props) {
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
