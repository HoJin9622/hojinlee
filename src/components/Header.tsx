import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="border-b-2 border-b-gray-50 h-14 font-bold">
      <div className="flex items-center h-full mx-auto px-2 md:px-4 lg:px-5">
        <Link href="/" className="cursor-pointer text-xl">
          Jin&apos;s devlog
        </Link>
      </div>
    </header>
  );
}
