import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { href: "/home", label: "Sanctuary" },
  { href: "/circles", label: "Circles" }
];

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <header className="border-b border-stone-200/80 bg-stone-50/95">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/home" className="text-sm font-medium tracking-[0.08em] text-stone-700 uppercase">
            Tessera
          </Link>

          <nav className="flex items-center gap-5 text-sm text-stone-600">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-stone-900">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">{children}</main>
    </div>
  );
}
