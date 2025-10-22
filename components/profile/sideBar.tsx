"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, MapPin, Package, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  name: string;
  surname: string;
}

interface MenuItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: Record<string, MenuItem[]> = {
    "Kişisel Bilgiler": [
      {
        name: "Kişisel Bilgilerim",
        path: "/profile",
        icon: <User size={16} />,
      },
      {
        name: "Adreslerim",
        path: "/profile/addresses",
        icon: <MapPin size={16} />,
      },
    ],
    "Sipariş Bilgileri": [
      {
        name: "Siparişlerim",
        path: "/profile/orders",
        icon: <Package size={16} />,
      },
    ],
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/account/check");
        const data = await res.json();
        setUser(data.user || null);
      } catch (err) {
        console.error("Kullanıcı bilgisi alınamadı", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Bilgi güncelleme event’ini dinle
    const handleUserUpdated = () => {
      fetchUser();
    };

    window.addEventListener("user-updated", handleUserUpdated);

    if (!isMobile) setIsOpen(true);
    else setIsOpen(false);

    return () => {
      window.removeEventListener("user-updated", handleUserUpdated);
    };
  }, [isMobile]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
    } catch (err) {
      console.error("Çıkış yapılamadı", err);
    }
  };

  return (
    <Card className="flex flex-col justify-start bg-white border border-gray-200 backdrop-blur-sm w-full max-w-md md:w-80 md:min-h-screen">
      <CardContent className="p-6 md:p-8 flex flex-col justify-start space-y-8 h-full">
        {/* Kullanıcı Bilgileri ve Accordion Toggle */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-40 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            ) : (
              <>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  {user ? `${user.name} ${user.surname}` : "Misafir Kullanıcı"}
                </h2>
                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-1 md:gap-2 text-red-500 hover:text-red-700 mt-1 md:mt-2 p-0"
                  >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">Çıkış Yap</span>
                  </Button>
                )}
              </>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
          </motion.div>
        </div>

        {/* Menü */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-6 mt-4"
            >
              {Object.entries(menuItems).map(([kategori, items]) => (
                <div key={kategori}>
                  <h3 className="text-md font-semibold text-gray-700 mb-3">
                    {kategori}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {items.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <motion.li
                          key={item.path}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={item.path}
                            className={`flex items-center gap-2 px-3 py-2 text-sm transition-all duration-200 ${
                              isActive
                                ? "bg-green-100 text-green-800 font-semibold"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                          >
                            {item.icon} {item.name}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
