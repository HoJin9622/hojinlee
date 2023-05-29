import './code-highlight.css';
import './anchor.css';
import './utterances.css';

import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

import CommentList from '@/components/CommentList';
import PostButton from '@/components/PostButton';
import { getPost, getPosts } from '@/utils/posts';

type Props = {
  params: { slug: string };
};

export default function PostPage({ params: { slug } }: Props) {
  const post = getPost(slug);
  const posts = getPosts();

  const postIndex = posts.findIndex(
    (postMetadata) => postMetadata.slug === slug,
  );

  const nextPost = postIndex === 0 ? null : posts[postIndex - 1];
  const prevPost = postIndex === posts.length - 1 ? null : posts[postIndex + 1];

  return (
    <div className="mt-2 max-w-[735.7px] lg:px-0 lg:mt-4 mx-auto px-2">
      <h1 className="font-bold text-2xl md:text-3xl mb-3">{post.title}</h1>
      <div className="text-sm md:text-base text-gray-500">{post.date}</div>

      <article className="prose md:prose-lg mt-10">
        {/* @ts-expect-error RSC */}
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkToc],
              rehypePlugins: [
                rehypePrism,
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    properties: {
                      className: ['anchor'],
                    },
                  },
                ],
              ],
            },
          }}
        />
      </article>

      <div className="flex flex-col-reverse gap-2 md:flex-row md: justify-between">
        {prevPost && (
          <PostButton slug={prevPost.slug} title={prevPost.title} type="이전" />
        )}
        {nextPost && (
          <PostButton slug={nextPost.slug} title={nextPost.title} type="다음" />
        )}
      </div>
      <CommentList />
    </div>
  );
}

export const generateStaticParams = async () => {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export function generateMetadata({ params: { slug } }: Props): Metadata {
  const post = getPost(slug);
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
