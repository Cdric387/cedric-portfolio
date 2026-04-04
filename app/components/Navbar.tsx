// app/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-gray-100 dark:bg-gray-900">
      <Link href="/">Home</Link>
      <Link href="/projects">Projets</Link>
      <Link href="/about">À propos</Link>
    </nav>
  );
}