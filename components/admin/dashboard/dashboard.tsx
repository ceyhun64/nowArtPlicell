"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/admin/sideBar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

interface Address {
  type: string;
  address: string;
  district: string;
  city: string;
  country: string;
  zip: string;
  phone: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  totalPrice: number;
  product: {
    name: string;
  };
}

interface Order {
  id: number;
  totalPrice: number;
  currency?: string;
  user?: User;
  items?: OrderItem[];
  addresses?: Address[];
}

interface KPI {
  id: string;
  title: string;
  stat: number | string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function AdminDashboard() {
  const isMobile = useIsMobile();
  const [kpiData, setKpiData] = useState<KPI[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const dummyKPI: KPI[] = [
      {
        id: "products",
        title: "Ürünler",
        stat: 128,
        description: "Ürünleri görüntüle ve yönet",
        icon: <Package size={24} className="text-blue-500" />,
        href: "/admin/products",
      },
      {
        id: "orders",
        title: "Siparişler",
        stat: 42,
        description: "Siparişleri takip et ve yönet",
        icon: <ShoppingCart size={24} className="text-emerald-500" />,
        href: "/admin/orders",
      },
      {
        id: "subscribers",
        title: "Aboneler",
        stat: 312,
        description: "Abone listesini görüntüle",
        icon: <CreditCard size={24} className="text-yellow-500" />,
        href: "/admin/subscribers",
      },
      {
        id: "users",
        title: "Kullanıcılar",
        stat: 98,
        description: "Kullanıcıları yönet",
        icon: <Users size={24} className="text-violet-500" />,
        href: "/admin/users",
      },
      {
        id: "settings",
        title: "Ayarlar",
        stat: "",
        description: "Site ayarlarını yönet",
        icon: <Settings size={24} className="text-pink-500" />,
        href: "/admin/settings",
      },
    ];

    const dummyOrders: Order[] = [
      {
        id: 1012,
        totalPrice: 2499,
        currency: "TRY",
        user: {
          id: 1,
          name: "Ahmet",
          surname: "Yılmaz",
          email: "ahmet@example.com",
        },
        addresses: [
          {
            type: "Teslimat",
            address: "Cumhuriyet Mah. 123. Sok. No:5",
            district: "Beşiktaş",
            city: "İstanbul",
            country: "Türkiye",
            zip: "34349",
            phone: "05321234567",
          },
        ],
        items: [
          {
            id: 1,
            quantity: 2,
            totalPrice: 1200,
            product: { name: "Lüks Halı Modeli" },
          },
          {
            id: 2,
            quantity: 1,
            totalPrice: 1299,
            product: { name: "Modern Kilim" },
          },
        ],
      },
      {
        id: 1009,
        totalPrice: 1899,
        currency: "TRY",
        user: {
          id: 2,
          name: "Elif",
          surname: "Demir",
          email: "elif@example.com",
        },
        addresses: [
          {
            type: "Teslimat",
            address: "Atatürk Cad. No:20",
            district: "Bornova",
            city: "İzmir",
            country: "Türkiye",
            zip: "35040",
            phone: "05421234567",
          },
        ],
        items: [
          {
            id: 3,
            quantity: 3,
            totalPrice: 1899,
            product: { name: "Dijital Baskı Halı" },
          },
        ],
      },
    ];

    setKpiData(dummyKPI);
    setRecentOrders(dummyOrders);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <main className={`flex-1 p-4 md:p-8 ${isMobile ? "" : "ml-64"}`}>
        <div className="flex justify-between items-center mb-6 ms-12 mt-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#001e59]">
            Yönetim Paneli
          </h1>
        </div>

        {/* KPI Kartları */}
        <div
          className={`grid gap-6 mb-8 ${
            isMobile
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {kpiData.map((card) => (
            <Link key={card.id} href={card.href}>
              <Card className="bg-white border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-all rounded-2xl shadow-md cursor-pointer group">
                <CardHeader className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors">
                    {card.icon}
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 text-lg">
                      {card.title}
                    </CardTitle>
                    {card.stat !== "" && (
                      <CardDescription className="text-gray-900 text-2xl font-bold">
                        {card.stat}
                      </CardDescription>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-500">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Son Siparişler */}
        <div className="grid gap-4">
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Son Siparişler
              </CardTitle>
              <Separator className="mt-2 bg-gray-200" />
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <ul className="space-y-4">
                  {recentOrders.map((order) => (
                    <li
                      key={order.id}
                      className="bg-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">
                          Sipariş #{order.id}
                        </span>
                        <span className="text-emerald-500 font-bold">
                          {order.currency || "TRY"} {order.totalPrice}
                        </span>
                      </div>

                      <div className="text-gray-700 mb-2 space-y-1">
                        <p>
                          <span className="font-semibold">Müşteri:</span>{" "}
                          {order.user?.name} {order.user?.surname} (
                          {order.user?.email})
                        </p>
                        <p>
                          <span className="font-semibold">Telefon:</span>{" "}
                          {order.addresses?.[0]?.phone || "-"}
                        </p>
                      </div>

                      <div className="text-gray-500 mb-3">
                        {order.addresses?.map((addr, idx) => (
                          <p key={idx} className="text-sm">
                            <span className="font-semibold">
                              {addr.type} Adres:
                            </span>{" "}
                            {addr.address}, {addr.district}, {addr.city},{" "}
                            {addr.country} - {addr.zip}
                          </p>
                        ))}
                      </div>

                      <div className="text-gray-700">
                        <span className="font-semibold">Ürünler:</span>
                        <ul className="ml-4 mt-1 space-y-1">
                          {order.items?.map((item) => (
                            <li
                              key={item.id}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.product?.name} x{item.quantity}
                              </span>
                              <span>
                                {item.totalPrice} {order.currency || "TRY"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  Henüz sipariş bulunmamaktadır.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
