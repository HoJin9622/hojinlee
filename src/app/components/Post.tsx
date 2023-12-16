import Image from 'next/image'
import Link from 'next/link'

type PostProps = {
  slug: string
  coverImage: string
  title: string
  subtitle: string
}

export default function Post({ slug, coverImage, title, subtitle }: PostProps) {
  return (
    <Link href={`/posts/${slug}`} key={slug}>
      <div className='relative h-60'>
        <Image
          fill
          src={coverImage}
          sizes='100vw'
          alt='cover image'
          className='w-full object-cover'
        />
      </div>
      <h4>{title}</h4>
      <div>{subtitle}</div>
    </Link>
  )
}
