"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Compass, House, LayoutGrid, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "首页", icon: House, matchPrefix: "/" },
  { href: "/discover", label: "发现", icon: Compass, matchPrefix: "/discover" },
  { href: "/category/cover", label: "分类", icon: LayoutGrid, matchPrefix: "/category" },
  { href: "/scene/work-report", label: "场景", icon: Search, matchPrefix: "/scene" },
  { href: "/favorites", label: "收藏", icon: Bookmark, matchPrefix: "/favorites" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-line bg-panel text-sm font-semibold text-ink">
            页
          </div>
          <div>
            <div className="text-sm text-soft">PPT 优秀单页灵感库</div>
            <div className="text-base font-semibold tracking-tight text-ink">Single Slide Reference</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map(({ href, label, icon: Icon, matchPrefix }) => {
            const active =
              matchPrefix === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(matchPrefix);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  active
                    ? "bg-charcoal text-sand"
                    : "text-muted hover:bg-panel hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-ink"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">搜索标题、标签、场景</span>
          <span className="sm:hidden">搜索</span>
        </Link>
      </div>
    </header>
  );
}
