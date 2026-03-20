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
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-black/42 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-7">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-sm font-semibold text-white">
            页
          </div>
          <div>
            <div className="text-sm text-white/45">PPT 优秀单页灵感库</div>
            <div className="text-base font-semibold tracking-tight text-white">Single Slide Reference</div>
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
                    ? "bg-white text-ink"
                    : "text-white/92 hover:bg-white/10 hover:text-white",
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
          className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm text-white/92 transition hover:border-accent hover:bg-white/12 hover:text-white"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">搜索标题、标签、场景</span>
          <span className="sm:hidden">搜索</span>
        </Link>
      </div>
    </header>
  );
}
