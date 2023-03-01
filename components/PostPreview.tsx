import Link from 'next/link'
import { PostMetadata } from './PostMetadata'

export default function PostPreview(props: PostMetadata) {
  return (
    <Link href={`/posts/${props.slug}`}>
      <div className='space-y-2 border-b-2 px-3 py-4'>
        <h2 className='font-medium text-base'>{props.title}</h2>
        <p className='text-sm'>{props.subtitle}</p>
        <span className='text-sm'>{props.date}</span>
      </div>
    </Link>
  )
}
