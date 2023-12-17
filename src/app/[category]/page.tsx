import { redirect } from 'next/navigation'
import React from 'react'

import { getCategories, getPosts } from '@/utils/post'

import PostList from '../components/PostList'

type Props = {
  params: { category: string }
}

export default function Category({ params: { category } }: Props) {
  const posts = getPosts(category)

  if (!posts.length) {
    redirect('/')
  }

  return <PostList category={category} />
}

export const generateStaticParams = async () => {
  const categories = getCategories()
  return Object.keys(categories).map((category) => ({
    category,
  }))
}
