import type { Metadata } from "next";
import "./globals.css";
import { PageShell } from "@/components/page-shell";
import { CollectionsProvider } from "@/components/providers/collections-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

export const metadata: Metadata = {
  title: "PageMuse",
  description: "PageMuse 按场景、页型与风格筛选优秀 PPT 单页，帮助你快速建立参考与灵感库。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <CollectionsProvider>
          <ToastProvider>
            <PageShell>{children}</PageShell>
          </ToastProvider>
        </CollectionsProvider>
      </body>
    </html>
  );
}
