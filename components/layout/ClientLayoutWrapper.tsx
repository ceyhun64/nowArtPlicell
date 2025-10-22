"use client";

import { usePathname } from "next/navigation";
import SocialSidebar from "@/components/layout/socialSidebar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Admin sayfalarında sidebar görünmesin
  const isAdminPage = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {children}
      {!isAdminPage && <SocialSidebar />}
    </>
  );
}
