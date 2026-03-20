import { ReactNode } from "react";
import { TopNav } from "@/components/top-nav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-bg min-h-screen text-ink">
      <TopNav />
      <main className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
