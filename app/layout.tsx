import type { Metadata } from "next";
import "./globals.css";
import { PageShell } from "@/components/page-shell";
import { CollectionsProvider } from "@/components/providers/collections-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

export const metadata: Metadata = {
  title: "PPT 优秀单页灵感库",
  description: "按场景、页型与风格筛选优秀 PPT 单页，快速理解结构并建立自己的参考库。",
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
