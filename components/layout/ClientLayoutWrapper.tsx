"use client";

import { usePathname } from "next/navigation";
import SocialSidebar from "@/components/layout/socialSidebar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Admin ve checkout sayfalarında sidebar görünmesin
  const isAdminPage = pathname?.startsWith("/admin") ?? false;
  const isCheckoutPage = pathname?.startsWith("/checkout") ?? false;

  const showSidebar = !isAdminPage && !isCheckoutPage;

  return (
    <>
      {children}
      {showSidebar && <SocialSidebar />}
    </>
  );
}
