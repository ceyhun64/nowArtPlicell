"use client";

import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/admin/sideBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DefaultPagination from "@/components/layout/pagination";
import { Loader, Truck, CheckCircle, XCircle, Package } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Loading from "@/components/layout/loading";
import OrderDetailDialog from "./orderDetailDialog";
import { Dialog } from "@/components/ui/dialog";
import { FormattedOrder } from "@/types/order";

export default function Orders() {
  const isMobile = useIsMobile();
  const [orders, setOrders] = useState<FormattedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<FormattedOrder | null>(
    null
  );

  const itemsPerPage = 15;
  const statusOrder: FormattedOrder["status"][] = [
    "pending",
    "paid",
    "shipped",
    "delivered",
  ];

  const getStatusInTurkish = (status: string) => {
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

  const getStatusBadge = (status: string) => {
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

  const getNextStatus = (currentStatus: FormattedOrder["status"]) => {
    const index = statusOrder.indexOf(currentStatus);
    return index >= 0 && index < statusOrder.length - 1
      ? statusOrder[index + 1]
      : null;
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order");
      const data = await res.json();

      if (data.status === "success") {
        const formatted: FormattedOrder[] = data.orders.map((o: any) => ({
          ...o, // API tipini koru
        }));
        setOrders(formatted);
      } else {
        console.error("API Hatası:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (
    orderId: number,
    currentStatus: FormattedOrder["status"]
  ) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus)
      return alert("Bu siparişin durumu daha fazla güncellenemez.");
    if (
      !confirm(
        `Sipariş #${orderId} '${getStatusInTurkish(
          currentStatus
        )}' → '${getStatusInTurkish(nextStatus)}' olarak güncellenecek.`
      )
    )
      return;

    try {
      const res = await fetch("/api/order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: nextStatus }),
      });
      const data = await res.json();
      if (data.status === "success") fetchOrders();
      else alert(`Güncelleme başarısız: ${data.error}`);
    } catch (err) {
      console.error(err);
      alert("Sunucu hatası.");
    }
  };

  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          `${o.user.name} ${o.user.surname}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          o.user.email.toLowerCase().includes(search.toLowerCase()) ||
          String(o.id).includes(search)
      ),
    [orders, search]
  );

  const paginatedOrders = useMemo(
    () =>
      filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredOrders, currentPage]
  );

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <main className={`flex-1 p-4 md:p-8 ${isMobile ? "ml-0" : "md:ml-64"}`}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#001e59] ms-12 mb-10">
          Sipariş Yönetimi
        </h1>
        <Input
          placeholder="Müşteri adı, email veya ID ara..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-64 mb-6"
        />

        <div className="overflow-x-auto rounded-2xl border bg-white shadow-md">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-[#001e59]">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Müşteri</th>
                <th className="px-4 py-3 hidden sm:table-cell">Email</th>
                <th className="px-4 py-3">Ürünler</th>
                <th className="px-4 py-3 hidden md:table-cell">Tutar</th>
                <th className="px-4 py-3 hidden md:table-cell">Tarih</th>
                <th className="px-4 py-3 hidden lg:table-cell">Durum</th>
                <th className="px-4 py-3">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    Sipariş bulunamadı.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const nextStatus = getNextStatus(order.status);
                  return (
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
                      <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <Button
                          size="sm"
                          className="bg-[#001e59] hover:bg-[#002b87] text-white"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Detay
                        </Button>
                        {nextStatus && (
                          <Button
                            size="sm"
                            className="bg-[#6a0dad] hover:bg-[#7e2ee3] text-white"
                            onClick={() =>
                              handleUpdateStatus(order.id, order.status)
                            }
                          >
                            {getStatusInTurkish(nextStatus)}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <DefaultPagination
            totalItems={filteredOrders.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <Dialog
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          {selectedOrder && (
            <OrderDetailDialog
              order={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              onUpdateStatus={handleUpdateStatus}
              getStatusInTurkish={getStatusInTurkish}
              getStatusBadge={getStatusBadge}
              getNextStatus={getNextStatus}
            />
          )}
        </Dialog>
      </main>
    </div>
  );
}
