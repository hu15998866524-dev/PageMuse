import { ReactNode } from "react";
import { TopNav } from "@/components/top-nav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-bg min-h-screen text-ink">
      <TopNav />
      <main className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-8">{children}</main>
      <footer className="mx-auto max-w-7xl px-5 pb-8 pt-2 text-center md:px-8 md:pb-10">
        <p className="text-xs leading-6 text-white/42">
          图片仅供学习参考，禁止商业使用。如有侵权，请联系删除。
        </p>
      </footer>
    </div>
  );
}
