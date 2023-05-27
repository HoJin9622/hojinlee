import React from 'react';

import categoryUrls from '@/constants/category';

import Post from './Post';

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  return (
    <article className="space-y-1 divide-y mt-5">
      {posts.map((post) => (
        <Post
          key={post.slug}
          category={categoryUrls[post.category]}
          date={post.date}
          slug={post.slug}
          title={post.title}
          subtitle={post.subtitle}
          coverImage={post.coverImage}
        />
      ))}
    </article>
  );
}
