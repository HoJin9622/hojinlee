import Markdown from 'markdown-to-jsx';
import type { Metadata } from 'next';
import React from 'react';

import CommentList from '@/components/CommentList';
import PostButton from '@/components/PostButton';
import { getPostContent, getPostMetadata } from '@/utils/posts';

type Props = {
  params: { slug: string };
};

export default function PostPage({ params: { slug } }: Props) {
  const post = getPostContent(slug);
  const posts = getPostMetadata();

  const postIndex = posts.findIndex(
    (postMetadata) => postMetadata.slug === slug,
  );

  const nextPost = postIndex === 0 ? null : posts[postIndex - 1];
  const prevPost = postIndex === posts.length - 1 ? null : posts[postIndex + 1];

  return (
    <div className="px-6 mt-6">
      <h1 className="font-bold text-2xl md:text-3xl mb-3">{post.title}</h1>
      <div className="text-sm md:text-base text-gray-500">{post.date}</div>

      <article className="prose md:prose-lg mt-10">
        <Markdown>{post.content}</Markdown>
      </article>

      <div className="flex justify-between">
        <div>
          {prevPost && (
            <PostButton
              slug={prevPost.slug}
              title={prevPost.title}
              type="이전"
            />
          )}
        </div>
        <div>
          {nextPost && (
            <PostButton
              slug={nextPost.slug}
              title={nextPost.title}
              type="다음"
            />
          )}
        </div>
      </div>
      <CommentList />
    </div>
  );
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({ slug: post.slug }));
};

export function generateMetadata({ params: { slug } }: Props): Metadata {
  const post = getPostContent(slug);
  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      images: post.coverImage,
      siteName: "Jin's Tech Blog: 기술적 사고와 경험의 공유",
      locale: 'ko',
      type: 'website',
      url: 'https://devlog.nextlevels.net/',
    },
    twitter: {
      title: post.title,
      description: post.subtitle,
      images: post.coverImage,
      card: 'summary_large_image',
    },
  };
}
