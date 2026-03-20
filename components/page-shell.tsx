import { ReactNode } from "react";
import { TopNav } from "@/components/top-nav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <TopNav />
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">{children}</main>
    </div>
  );
}
