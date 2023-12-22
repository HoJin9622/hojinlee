// import './code-highlight.css'
// import './anchor.css'
// import './utterances.css'

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'

import { getPost, getPosts } from '@/utils/post'

import PostButton from './components/PostButton'

type Props = {
  params: { slug: string }
}

export default function PostPage({ params: { slug } }: Props) {
  const post = getPost(slug)

  if (!post) {
    redirect('/')
  }

  const posts = getPosts()

  const postIndex = posts.findIndex(
    (postMetadata) => postMetadata.slug === slug,
  )

  const nextPost = postIndex === 0 ? null : posts[postIndex - 1]
  const prevPost = postIndex === posts.length - 1 ? null : posts[postIndex + 1]

  return (
    <div className='mx-auto mt-2 max-w-[735.7px] px-2 lg:mt-4 lg:px-0'>
      <h1 className='mb-3 text-2xl font-bold md:text-3xl'>{post.title}</h1>
      <div className='text-sm text-gray-500 md:text-base'>{post.date}</div>

      <article className='prose md:prose-lg mt-10'>
        <MDXRemote source={post.content} />
      </article>

      <nav className='flex justify-between py-8'>
        {prevPost && (
          <PostButton slug={prevPost.slug} title={prevPost.title} type='이전' />
        )}
        {nextPost && (
          <PostButton slug={nextPost.slug} title={nextPost.title} type='다음' />
        )}
      </nav>
      {/* <CommentList /> */}
    </div>
  )
}

export const generateStaticParams = async () => {
  const posts = getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params: { slug } }: Props): Metadata {
  const post = getPost(slug)
  return {
    title: post?.title,
    description: post?.subtitle,
    openGraph: {
      title: post?.title,
      description: post?.subtitle,
      images: post?.coverImage,
      siteName: "Jin's Tech Blog: 기술적 사고와 경험의 공유",
      locale: 'ko',
      type: 'website',
      url: 'https://devlog.nextlevels.net/',
    },
    twitter: {
      title: post?.title,
      description: post?.subtitle,
      images: post?.coverImage,
      card: 'summary_large_image',
    },
  }
}
