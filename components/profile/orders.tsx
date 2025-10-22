"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sideBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// ==== Tip Tanımları ====
interface Address {
  id: string | number;
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  zip?: string;
  country: string;
}

interface Product {
  id: number;
  title: string;
  category: string;
  mainImage: string;
  subImage?: string;
  pricePerM2?: number;
}

interface OrderItem {
  id: string | number;
  product: Product;
  quantity: number;
  totalPrice: number;
  m2?: number;
  width?: number;
  height?: number;
  profile?: string;
  device?: string;
  note?: string;
  unitPrice?: number;
}

interface Order {
  id: string | number;
  createdAt: string;
  updatedAt?: string;
  status: string;
  paidPrice: number;
  totalPrice: number;
  currency: string;
  paymentMethod?: string;
  transactionId?: string;
  addresses: Address[];
  items: OrderItem[];
}

// ==== Ana Bileşen ====
export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/user", { method: "GET" });
      const data = await res.json();

      if (data.status === "success") setOrders(data.orders);
      else toast.error("Siparişler alınamadı.");
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string | number) => {
    try {
      setUpdating(true);
      const res = await fetch("/api/order/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Sipariş başarıyla iptal edildi.");
        await fetchOrders();
      } else toast.error(data.error || "Sipariş iptal edilemedi.");
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu.");
    } finally {
      setUpdating(false);
      setSelectedOrder(null);
    }
  };

  // 💰 Para birimi formatlayıcı
  const formatCurrency = (amount: number, currency?: string) => {
    if (!amount) return "0 ₺";
    const symbol =
      currency === "TRY" || currency === "TL"
        ? "₺"
        : currency === "USD"
        ? "$"
        : currency === "EUR"
        ? "€"
        : currency || "₺";
    return `${amount.toFixed(2)} ${symbol}`;
  };

  // 🇹🇷 Durumları Türkçeleştir
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 justify-center items-start px-4 py-16 md:px-10 md:pt-20">
        <div className="w-full max-w-3xl space-y-8">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-800">Siparişlerim</h2>
            <p className="text-gray-600">
              Aktif ve geçmiş siparişlerinizi burada görüntüleyebilirsiniz.
            </p>
          </motion.div>

          {/* Yükleniyor */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <Card key={i} className="p-6 border border-gray-200 shadow">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20 mt-2" />
                  <Skeleton className="h-16 w-full mt-4" />
                </Card>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="p-4 bg-blue-50 rounded-md text-gray-700">
              Henüz bir siparişiniz bulunmuyor.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const iptalEdilebilir = ![
                  "cancelled",
                  "shipped",
                  "delivered",
                ].includes(order.status);

                const teslimat = order.addresses.find(
                  (a) => a.type === "shipping"
                );
                const fatura = order.addresses.find(
                  (a) => a.type === "billing"
                );

                // Türkçe durum metni
                const durumText = getStatusInTurkish(order.status);

                return (
                  <Card
                    key={order.id}
                    className="border border-gray-200 shadow-lg rounded-2xl bg-white"
                  >
                    <CardHeader className="p-6 border-b flex justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          Sipariş No: #{order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString("tr-TR")}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "paid"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {durumText}
                      </span>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                      {/* Ürünler */}
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="border-b pb-4 flex justify-between items-center"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={item.product.mainImage}
                                alt={item.product.title}
                                className="w-16 h-16 rounded-md border object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-800">
                                  {item.product.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Kategori: {item.product.category}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Profil: {item.profile || "—"} | Cihaz:{" "}
                                  {item.device || "—"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Ölçü: {item.width}cm x {item.height}cm (
                                  {item.m2}m²)
                                </p>
                                {item.note && (
                                  <p className="text-xs italic text-gray-400 mt-1">
                                    Not: {item.note}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-teal-700 font-semibold">
                                {formatCurrency(
                                  item.totalPrice,
                                  order.currency
                                )}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} Adet
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Ödeme Bilgileri */}
                      <div className="bg-gray-50 p-4 rounded-md text-sm">
                        <p>
                          <strong>Ödenen Tutar:</strong>{" "}
                          {formatCurrency(order.paidPrice, order.currency)}
                        </p>
                        <p>
                          <strong>Ödeme Yöntemi:</strong>{" "}
                          {order.paymentMethod || "—"}
                        </p>
                        <p>
                          <strong>İşlem No:</strong>{" "}
                          {order.transactionId || "—"}
                        </p>
                        <p>
                          <strong>Son Güncelleme:</strong>{" "}
                          {new Date(order.updatedAt || "").toLocaleString(
                            "tr-TR"
                          )}
                        </p>
                      </div>

                      {/* Adresler */}
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        {teslimat && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="font-semibold mb-1">
                              Teslimat Adresi
                            </p>
                            <p>{teslimat.address}</p>
                            <p>
                              {teslimat.city}, {teslimat.country}
                            </p>
                            {teslimat.phone && <p>Tel: {teslimat.phone}</p>}
                          </div>
                        )}
                        {fatura && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="font-semibold mb-1">Fatura Adresi</p>
                            <p>{fatura.address}</p>
                            <p>
                              {fatura.city}, {fatura.country}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Alt Kısım */}
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-lg text-gray-800">
                          Toplam:{" "}
                          {formatCurrency(order.totalPrice, order.currency)}
                        </p>

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Detaylar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Sipariş #{order.id} Detayları
                                </DialogTitle>
                                <DialogDescription>
                                  Siparişe ait tüm bilgiler aşağıda
                                  listelenmiştir.
                                </DialogDescription>
                              </DialogHeader>

                              <div className="text-sm text-gray-700 space-y-2 mt-3">
                                <p>
                                  <strong>Durum:</strong> {durumText}
                                </p>
                                <p>
                                  <strong>Ödeme:</strong>{" "}
                                  {formatCurrency(
                                    order.paidPrice,
                                    order.currency
                                  )}{" "}
                                  ({order.paymentMethod})
                                </p>
                                <p>
                                  <strong>İşlem No:</strong>{" "}
                                  {order.transactionId}
                                </p>
                                <p>
                                  <strong>Ürün Sayısı:</strong>{" "}
                                  {order.items.length}
                                </p>
                                <p>
                                  <strong>Oluşturulma:</strong>{" "}
                                  {new Date(order.createdAt).toLocaleString(
                                    "tr-TR"
                                  )}
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* İptal Et */}
                          {iptalEdilebilir && (
                            <Dialog
                              open={selectedOrder?.id === order.id}
                              onOpenChange={(open) =>
                                !open && setSelectedOrder(null)
                              }
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                  disabled={updating}
                                >
                                  {updating
                                    ? "İptal ediliyor..."
                                    : "Siparişi İptal Et"}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Siparişi İptal Et</DialogTitle>
                                  <DialogDescription>
                                    #{order.id} numaralı siparişi iptal etmek
                                    istediğinize emin misiniz?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Vazgeç</Button>
                                  </DialogClose>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleCancelOrder(order.id)}
                                  >
                                    Evet, İptal Et
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
