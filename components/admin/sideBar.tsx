"use client";

import React, { useState } from "react";
import {
  Box,
  Users,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  FileText, // 🆕 Bloglar ikonu
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

export default function AdminSidebar(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 🧭 Menü öğeleri
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Yönetici Paneli",
      icon: Box,
      href: "/admin/dashboard",
    },
    {
      id: "products",
      label: "Ürünler",
      icon: Package,
      href: "/admin/products",
    },
    {
      id: "orders",
      label: "Siparişler",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    { id: "users", label: "Kullanıcılar", icon: Users, href: "/admin/users" },
    {
      id: "blogs",
      label: "Bloglar", // 🆕 Yeni Menü
      icon: FileText,
      href: "/admin/blogs",
    },
 
  ];

  const active =
    menuItems.find(
      (item) => pathname === item.href || pathname.startsWith(item.href + "/")
    )?.id || "dashboard";

  const handleLogout = () => {
    alert("Çıkış yapıldı (simülasyon)");
    router.push("/admin");
  };

  const AdminInfo = (
    <div className="flex flex-col gap-1 p-4 border-t border-gray-200">
      <span className="font-semibold text-gray-900">Abdulkadir Cer</span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
      >
        <LogOut size={15} /> <span>Çıkış</span>
      </button>
    </div>
  );

  // 🖥️ Masaüstü görünüm
  const DesktopSidebar = (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white shadow-lg flex flex-col justify-between border-r border-gray-200">
      <div>
        <div className="px-6 py-6 border-b border-gray-200 flex items-center gap-2">
          <Box className="text-[#92e676] w-6 h-6" />
          <Link
            href="/admin/dashboard"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            NewArt<span className="text-[#92e676]">Admin</span>
          </Link>
        </div>

        <nav className="flex flex-col mt-4 px-3">
          {menuItems.map(({ id, label, icon: Icon, href }) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                href={href}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#92e676]/20 text-[#001e59] shadow-inner"
                    : "text-gray-600 hover:text-[#001e59] hover:bg-gray-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#92e676] rounded-r-full"
                  />
                )}
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-[#92e676]"
                      : "text-gray-400 group-hover:text-[#92e676]"
                  }`}
                />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {AdminInfo}
    </aside>
  );

  // 📱 Mobil görünüm
  const MobileSidebar = (
    <>
      <Button
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-white text-[#001e59] border border-gray-300 hover:bg-gray-100 md:hidden"
      >
        <Menu />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md md:hidden shadow-lg"
          >
            <div className="flex justify-between items-center px-6 py-6 border-b border-gray-200">
              <Link
                href="/admin/dashboard"
                className="text-xl font-bold text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                NewArt<span className="text-[#92e676]">Admin</span>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
              >
                <X />
              </Button>
            </div>

            <nav className="flex flex-col mt-6 px-3 space-y-2">
              {menuItems.map(({ id, label, icon: Icon, href }) => {
                const isActive = active === id;
                return (
                  <Link
                    key={id}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`group relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-[#92e676]/20 text-[#001e59] shadow-inner"
                        : "text-gray-600 hover:text-[#001e59] hover:bg-gray-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeTabMobile"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#92e676] rounded-r-full"
                      />
                    )}
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-[#92e676]"
                          : "text-gray-400 group-hover:text-[#92e676]"
                      }`}
                    />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-6 bg-gray-200" />
            {AdminInfo}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      <div className="hidden md:block">{DesktopSidebar}</div>
      <div className="block md:hidden">{MobileSidebar}</div>
    </>
  );
}
