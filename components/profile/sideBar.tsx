"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, User, MapPin, Package } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

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

  // Sahte kullanıcı verisi
  useEffect(() => {
    const FAKE_USER: User = { name: "Ahmet", surname: "Yılmaz" };
    setUser(FAKE_USER);
  }, []);

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/account/login",
    });
  };

  return (
    <Card
      className={`${
        isMobile ? "w-full" : "w-80 min-h-screen"
      } flex flex-col justify-between bg-gradient-to-b from-white to-gray-50 `}
    >
      <CardContent className="p-6 flex flex-col justify-between h-full">
        {/* Kullanıcı Bilgileri */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {user ? `${user.name} ${user.surname}` : "Yükleniyor..."}
            </h2>

            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 mt-2 p-0"
              >
                <LogOut size={16} />
                <span>Çıkış Yap</span>
              </Button>
            )}
          </motion.div>

          {/* Menü */}
          <nav>
            {Object.entries(menuItems).map(([kategori, items]) => (
              <div key={kategori} className="mb-8">
                <h3 className="text-md font-semibold text-gray-700 mb-3">
                  {kategori}
                </h3>
                <ul
                  className={`${
                    isMobile ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"
                  }`}
                >
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
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-green-100 text-green-800 font-semibold"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Alt Bilgi */}
        <div className="text-xs text-gray-400 text-center mt-6">
          © 2025 - Kullanıcı Paneli
        </div>
      </CardContent>
    </Card>
  );
}
