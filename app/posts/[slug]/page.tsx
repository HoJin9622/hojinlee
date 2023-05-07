import Markdown from 'markdown-to-jsx';
import type { Metadata } from 'next';
import React from 'react';

import Comments from '@/components/Comments';
import { getPostContent, getPostMetadata } from '@/utils/posts';

type Props = {
  params: { slug: string };
};

export default function PostPage({ params: { slug } }: Props) {
  const post = getPostContent(slug);

  return (
    <div className="px-6 mt-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-sm text-gray-500">{post.date}</div>

      <article className="prose mt-10 md:prose-lg">
        <Markdown>{post.content}</Markdown>
      </article>

      <Comments />
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
      type: 'article',
    },
  };
}