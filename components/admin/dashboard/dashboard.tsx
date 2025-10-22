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
  Users,
  FileText,
  Loader,
  CheckCircle,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loading from "@/components/layout/loading";

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  totalPrice: number;
  product: {
    title: string;
  };
}

interface FormattedOrder {
  id: number;
  paidPrice: number;
  currency?: string;
  user: User;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  items: OrderItem[];
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
  const [recentOrders, setRecentOrders] = useState<FormattedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  // ---- STATUS Yardımcı Fonksiyonları ----
  const getStatusInTurkish = (status: FormattedOrder["status"]) => {
    switch (status) {
      case "pending":
        return "Ödeme Bekleniyor";
      case "paid":
        return "Ödeme Başarılı";
      case "shipped":
        return "Kargoya Verildi";
      case "delivered":
        return "Teslim Edildi";
      case "cancelled":
        return "İptal Edildi";
      default:
        return "Bilinmiyor";
    }
  };

  const getStatusBadge = (status: FormattedOrder["status"]) => {
    const label = getStatusInTurkish(status);
    switch (label) {
      case "Ödeme Bekleniyor":
        return (
          <Badge className="bg-yellow-500 flex items-center gap-1">
            <Loader className="w-3 h-3 animate-spin" />
            {label}
          </Badge>
        );
      case "Ödeme Başarılı":
        return (
          <Badge className="bg-blue-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {label}
          </Badge>
        );
      case "Kargoya Verildi":
        return (
          <Badge className="bg-amber-600 flex items-center gap-1">
            <Truck className="w-3 h-3" />
            {label}
          </Badge>
        );
      case "Teslim Edildi":
        return (
          <Badge className="bg-green-600 flex items-center gap-1">
            <Package className="w-3 h-3" />
            {label}
          </Badge>
        );
      case "İptal Edildi":
        return (
          <Badge className="bg-red-700 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {label}
          </Badge>
        );
      default:
        return <Badge>{label}</Badge>;
    }
  };

  // ---- API'den KPI ve Siparişleri Çek ----
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Tüm API çağrılarını paralel yap
      const [productRes, orderRes, userRes, blogRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/order"),
        fetch("/api/user"),
        fetch("/api/blog"),
      ]);

      const [productData, orderData, userData, blogData] = await Promise.all([
        productRes.json(),
        orderRes.json(),
        userRes.json(),
        blogRes.json(),
      ]);

      // KPI sayıları
      const productsCount =
        productData?.status === "success"
          ? productData.products?.length || 0
          : 0;
      const ordersCount =
        orderData?.status === "success" ? orderData.orders?.length || 0 : 0;
      const usersCount =
        userData?.status === "success" ? userData.users?.length || 0 : 0;
      const blogsCount =
        blogData?.status === "success" ? blogData.blogs?.length || 0 : 0;

      // KPI verilerini ayarla
      setKpiData([
        {
          id: "products",
          title: "Ürünler",
          stat: productsCount,
          description: "Ürünleri görüntüle ve yönet",
          icon: <Package size={24} className="text-blue-500" />,
          href: "/admin/products",
        },
        {
          id: "orders",
          title: "Siparişler",
          stat: ordersCount,
          description: "Siparişleri takip et ve yönet",
          icon: <ShoppingCart size={24} className="text-emerald-500" />,
          href: "/admin/orders",
        },
        {
          id: "users",
          title: "Kullanıcılar",
          stat: usersCount,
          description: "Kullanıcıları yönet",
          icon: <Users size={24} className="text-violet-500" />,
          href: "/admin/users",
        },
        {
          id: "blogs",
          title: "Bloglar",
          stat: blogsCount,
          description: "Blog listesini görüntüle",
          icon: <FileText size={24} className="text-yellow-500" />,
          href: "/admin/blogs",
        },
      ]);

      // En son 5 sipariş
      const latestOrders =
        orderData?.status === "success"
          ? orderData.orders
              .sort(
                (a: FormattedOrder, b: FormattedOrder) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 5)
          : [];

      setRecentOrders(latestOrders);
    } catch (err) {
      console.error("API hata:", err);
      setKpiData([]);
      setRecentOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ---- LOADING DURUMU ----
  if (loading) {
    return <Loading />;
  }

  // ---- DASHBOARD UI ----
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
                    <CardDescription className="text-gray-900 text-2xl font-bold">
                      {card.stat}
                    </CardDescription>
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

        {/* Son Siparişler Tablosu */}
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              Son Siparişler
            </CardTitle>
            <Separator className="mt-2 bg-gray-200" />
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                Henüz sipariş bulunmamaktadır.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-100 text-[#001e59]">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Müşteri</th>
                      <th className="px-4 py-3 hidden sm:table-cell">Email</th>
                      <th className="px-4 py-3">Ürünler</th>
                      <th className="px-4 py-3 hidden md:table-cell">Tutar</th>
                      <th className="px-4 py-3 hidden lg:table-cell">Durum</th>
                      <th className="px-4 py-3 hidden md:table-cell">Tarih</th>
                      <th className="px-4 py-3">Detay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-gray-50 transition-all"
                      >
                        <td className="px-4 py-3">{order.id}</td>
                        <td className="px-4 py-3 font-medium">
                          {order.user.name} {order.user.surname}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          {order.user.email}
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate">
                          {order.items.map((i) => i.product.title).join(", ")}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-emerald-600 font-semibold">
                          {order.paidPrice.toLocaleString("tr-TR")} ₺
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString(
                            "tr-TR"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Link href={`/admin/orders?orderId=${order.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-[#001e59] border-[#001e59] hover:bg-gray-100"
                            >
                              Gör
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {recentOrders.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Link href="/admin/orders" passHref>
                  <Button className="bg-[#001e59] hover:bg-[#002b87] text-white">
                    Tüm Siparişleri Gör
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
