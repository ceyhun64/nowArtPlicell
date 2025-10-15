"use client";

import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/admin/sideBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DefaultPagination from "@/components/layout/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Loader,
  Truck,
  CheckCircle,
  Menu,
  XCircle,
  Package,
  Wallet,
  ArrowRight, // Yeni ikon
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Loading from "@/components/layout/loading";
import OrderDetailDialog from "./orderDetailDialog";

import mockData from "@/seed/orders.json";

// TypeScript Arayüzleri
// İhtiyaca göre daha detaylı tanımlanabilir.
interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  mainImage: string;
}

interface Address {
  type: "shipping" | "billing";
  street: string;
  city: string;
  country: string;
}

interface FormattedOrder {
  id: number;
  customer: string;
  email: string;
  products: string[];
  totalPrice: string;
  paidPrice: string;
  paymentMethod: string;
  transactionId: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  date: string;
  createdAt: string;
  address: Address | undefined;
  items: OrderItem[];
}

export default function Orders() {
  // TypeScript state tanımları eklendi
  const isMobile = useIsMobile();
  const [orders, setOrders] = useState<FormattedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // ID'ler number
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<FormattedOrder | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 15; // Sayfa başına öğe sayısı

  // Sipariş durumlarının ilerleme sırası (Prisma enum'una uygun)
  const statusOrder: FormattedOrder["status"][] = [
    "pending",
    "paid",
    "shipped",
    "delivered",
  ];

  // Prisma Enum değerlerini okunabilir hale getiren yardımcı fonksiyon
  const getStatusInTurkish = (
    status: FormattedOrder["status"] | string
  ): string => {
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

  // Sipariş Durumu Rozeti (Badge) için yardımcı fonksiyon
  const getStatusBadge = (status: FormattedOrder["status"] | string) => {
    const turkishStatus = getStatusInTurkish(status);
    switch (turkishStatus) {
      case "Ödeme Bekleniyor":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-500/80 flex items-center gap-1">
            <Loader className="w-3 h-3 animate-spin" />
            {turkishStatus}
          </Badge>
        );
      case "Ödeme Başarılı":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-600/80 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {turkishStatus}
          </Badge>
        );
      case "Kargoya Verildi":
        return (
          <Badge className="bg-amber-600 hover:bg-amber-600/80 flex items-center gap-1">
            <Truck className="w-3 h-3" />
            {turkishStatus}
          </Badge>
        );
      case "Teslim Edildi":
        return (
          <Badge className="bg-green-600 hover:bg-green-600/80 flex items-center gap-1">
            <Package className="w-3 h-3" />
            {turkishStatus}
          </Badge>
        );
      case "İptal Edildi":
        return (
          <Badge className="bg-red-700 hover:bg-red-700/80 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {turkishStatus}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-stone-500 hover:bg-stone-500/80">
            {turkishStatus}
          </Badge>
        );
    }
  };

  // Durum ilerlemesi için yardımcı fonksiyon
  const getNextStatus = (
    currentStatus: FormattedOrder["status"]
  ): FormattedOrder["status"] | null => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    // delivered ve cancelled durumları ilerlemez.
    if (currentIndex >= 0 && currentIndex < statusOrder.length - 1) {
      return statusOrder[currentIndex + 1];
    }
    return null; // İlerleme yok (delivered veya cancelled gibi)
  };

  // Yeni durum setini (Mock)
  const handleUpdateStatus = async (
    orderId: number,
    currentStatus: FormattedOrder["status"]
  ) => {
    const nextStatus = getNextStatus(currentStatus);

    if (!nextStatus) {
      alert("Bu siparişin durumu daha fazla güncellenemez.");
      return;
    }

    if (
      !confirm(
        `Sipariş #${orderId} durumunu '${getStatusInTurkish(
          currentStatus
        )}' -> '${getStatusInTurkish(
          nextStatus
        )}' olarak güncellemek istiyor musunuz? (MOCK İşlem)`
      )
    ) {
      return;
    }

    try {
      // API çağrısı KALDIRILDI, sadece state güncellemesi yapılıyor (Mock)
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderId ? { ...o, status: nextStatus } : o
        )
      );
      // Detay Dialog açık ise onu da güncelle (Bu kısım isteğe bağlı)
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: nextStatus } : null
        );
      }
      alert(
        `[MOCK BAŞARILI] Sipariş #${orderId} durumu güncellendi: ${getStatusInTurkish(
          nextStatus
        )}`
      );
    } catch (err) {
      // Mock işlemde hata olmamalı ama yine de koyalım.
      console.error("Durum güncelleme sırasında hata:", err);
      alert("Sipariş durumu güncellenirken bir hata oluştu. (MOCK HATA)");
    }
  };

  // Sahte veriden siparişleri çekme ve formatlama (API çağrısı kaldırıldı)
  useEffect(() => {
    const loadOrders = () => {
      setLoading(true);

      setTimeout(() => {
        try {
          // Direkt mock veri array
          const apiOrders = mockData; // artık mockData direkt array

          const formattedOrders: FormattedOrder[] = apiOrders.map((o) => {
            return {
              id: o.id,
              customer: o.customer,
              email: o.email,
              products: o.items.map((i) => i.name),
              totalPrice: o.totalPrice,
              paidPrice: o.paidPrice,
              paymentMethod: o.paymentMethod || "Belirtilmemiş",
              transactionId: o.transactionId || "Yok",
              status: o.status as FormattedOrder["status"],
              date: new Date(o.createdAt).toLocaleDateString("tr-TR"),
              createdAt: new Date(o.createdAt).toLocaleString("tr-TR"),
              address: o.address
                ? {
                    type: "shipping", // JSON’da zaten tek adres var
                    street: o.address.address,
                    city: o.address.city,
                    country: o.address.country,
                  }
                : undefined,
              items: o.items.map((i) => ({
                name: i.name,
                quantity: i.quantity,
                unitPrice: i.unitPrice,
                totalPrice: i.totalPrice,
                mainImage: i.mainImage,
              })),
            };
          });

          setOrders(formattedOrders);
        } catch (err) {
          console.error("Siparişleri yüklerken hata:", err);
        } finally {
          setLoading(false);
        }
      }, 100); // 100ms gecikme
    };

    loadOrders();
  }, []);

  // Arama ve sıralama işlemlerini useMemo ile optimize et
  const filteredOrders = useMemo(() => {
    return orders
      .filter(
        (o) =>
          o.customer.toLowerCase().includes(search.toLowerCase()) ||
          o.email.toLowerCase().includes(search.toLowerCase()) ||
          String(o.id).includes(search) // ID araması için String'e çevrildi
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ); // Oluşturulma tarihine göre sıralama
  }, [orders, search]);

  // Sayfalamayı useMemo ile optimize et
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleDelete = (id: number) => {
    // Toplu silme butonu kullanıldığı için bu fonksiyon sadece tekli silme için
    if (confirm(`Sipariş #${id} silinecektir. Emin misiniz? (MOCK İşlem)`)) {
      setOrders(orders.filter((o) => o.id !== id));
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
      alert(`[MOCK BAŞARILI] Sipariş #${id} silindi.`);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(paginatedOrders.map((o) => o.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id))
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
          isMobile ? "ml-0" : "md:ml-64"
        }`}
      >
        {/* Başlık */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#001e59] ms-12">
            Sipariş Yönetimi
          </h1>
        </div>

        {/* Üst Araç Çubuğu */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant="default"
              className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                selectedIds.length > 0
                  ? "bg-[#001e59] text-white hover:bg-[#002b87]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={selectedIds.length === 0}
              onClick={() => {
                if (
                  confirm(
                    `${selectedIds.length} adet sipariş silinecektir. Emin misiniz? (MOCK İşlem)`
                  )
                ) {
                  setOrders(orders.filter((o) => !selectedIds.includes(o.id)));
                  setSelectedIds([]);
                  alert(
                    `[MOCK BAŞARILI] Seçilen ${selectedIds.length} adet sipariş silindi.`
                  );
                }
              }}
            >
              Seçilenleri Sil ({selectedIds.length})
            </Button>

            <Input
              type="text"
              placeholder="Müşteri adı, email veya ID ara..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#001e59] focus:outline-none"
            />
          </div>
        </div>

        {/* Sipariş Tablosu */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-md">
          <table className="min-w-full text-left text-gray-800">
            <thead className="bg-gray-100 text-[#001e59]">
              <tr>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length === paginatedOrders.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                  ID
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                  Müşteri
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden sm:table-cell">
                  Email
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200">
                  Ürünler
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden md:table-cell">
                  Ödenen Tutar
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden lg:table-cell">
                  Ödeme Yöntemi
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden lg:table-cell">
                  Durum
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 hidden xl:table-cell">
                  Tarih
                </th>
                <th className="px-2 sm:px-3 py-2 sm:py-3 border-b border-gray-200 text-center">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    Aranan kriterlere uygun sipariş bulunamadı.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const nextStatus = getNextStatus(order.status);
                  const canUpdateStatus = !!nextStatus;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-all border-b border-gray-100"
                    >
                      <td className="px-2 sm:px-3 py-2 sm:py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(order.id)}
                          onChange={() => handleSelectOne(order.id)}
                        />
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-700">
                        {order.id}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-900 font-medium">
                        {order.customer}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-600 hidden sm:table-cell">
                        {order.email}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-600 max-w-xs truncate">
                        {order.products.join(", ")}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 font-semibold text-emerald-600 hidden md:table-cell">
                        {order.paidPrice}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-700 hidden lg:table-cell">
                        {order.paymentMethod}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 hidden lg:table-cell">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 text-gray-500 hidden xl:table-cell">
                        {order.date}
                      </td>
                      <td className="px-2 sm:px-3 py-2 sm:py-3 flex flex-col sm:flex-row gap-2 justify-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-[#001e59] hover:bg-[#002b87] text-white rounded-lg shadow-sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              Detay
                            </Button>
                          </DialogTrigger>
                          {selectedOrder?.id === order.id && (
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

                        {canUpdateStatus && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(order.id, order.status)
                            }
                            className="bg-[#6a0dad] hover:bg-[#7e2ee3] text-white rounded-lg shadow-sm"
                          >
                            {getStatusInTurkish(nextStatus!)}
                          </Button>
                        )}

                        <Button
                          size="sm"
                          onClick={() => handleDelete(order.id)}
                          className="bg-[#ff3b30] hover:bg-[#ff453a] text-white rounded-lg shadow-sm"
                        >
                          Sil
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Sayfalama */}
        <div className="mt-6 flex justify-center">
          <DefaultPagination
            totalItems={filteredOrders.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
