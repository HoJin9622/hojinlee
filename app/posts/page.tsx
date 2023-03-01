import PostPreview from '@/components/PostPreview'
import { getPostMetadata } from '@/utils/posts'

export default function Posts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  if (!searchParams || !searchParams.category) {
    return '카테고리를 지정해주세요.'
  }

  const category = searchParams.category.toString()
  const posts = getPostMetadata(category)
  return (
    <div>
      {posts.map((post) => (
        <PostPreview key={post.slug} {...post} />
      ))}
    </div>
  )
}
