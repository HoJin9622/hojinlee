import Link from "next/link";

export default function Header() {
  return (
    <header className="flex border-b-2 border-b-gray-50 px-6 h-14 font-bold items-center">
      <Link href="/" className="cursor-pointer text-xl">
        Jin&apos;s devlog
      </Link>
    </header>
  );
}
