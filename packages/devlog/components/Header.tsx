import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b-2 border-b-gray-50 h-14 font-bold">
      <div className="flex items-center h-full max-w-screen-lg mx-auto px-6">
        <Link href="/" className="cursor-pointer text-xl">
          Jin&apos;s devlog
        </Link>
      </div>
    </header>
  );
}
