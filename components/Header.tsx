import Link from 'next/link'

export default function Header() {
  return (
    <header className='border-b-2 border-b-gray-50 px-3 py-4 font-bold'>
      <Link href='/' className='cursor-pointer text-red-400 text-xl'>
        Hojin&apos;s devlog
      </Link>
    </header>
  )
}
