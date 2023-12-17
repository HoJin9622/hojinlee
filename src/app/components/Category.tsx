import Link from 'next/link'

type Props = {
  category: string
  path: string
  active: boolean
}

export default function Category({ category, path, active }: Props) {
  return (
    <Link
      href={path}
      className={`rounded-2xl px-2 py-1 text-sm ${
        active
          ? 'bg-gray-600 text-white'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
      }`}
      key={category}
    >
      {category}
    </Link>
  )
}
