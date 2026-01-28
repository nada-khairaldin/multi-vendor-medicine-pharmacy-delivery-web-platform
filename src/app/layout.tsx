// app/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "../components/layout/header";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <html lang="en">
      <body>
        {!isAuthPage && <Header />}
        {children}
      </body>
    </html>
  );
}
