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
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton"; // 🔹 Shadcn Skeleton

// ===== Tip Tanımları =====
interface Address {
  id: string;
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
  name: string;
  mainImage: string;
}

interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  paidPrice: number;
  totalPrice: number;
  currency: string;
  paymentMethod?: string;
  transactionId?: string;
  addresses: Address[];
  items: OrderItem[];
}

// ===== Ana Bileşen =====
export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Sahte sipariş verisi
  useEffect(() => {
    setTimeout(() => {
      const SAHTE_SIPARISLER: Order[] = [
        {
          id: "12345",
          createdAt: new Date().toISOString(),
          status: "hazırlanıyor",
          paidPrice: 120,
          totalPrice: 150,
          currency: "TL",
          paymentMethod: "Kredi Kartı",
          transactionId: "TRX123",
          addresses: [
            {
              id: "addr1",
              type: "teslimat",
              firstName: "Ahmet",
              lastName: "Yılmaz",
              phone: "+905555555555",
              address: "Cumhuriyet Mah. 123. Sokak No:5",
              district: "Kadıköy",
              city: "İstanbul",
              zip: "34728",
              country: "Türkiye",
            },
          ],
          items: [
            {
              id: "item1",
              product: {
                name: "Spor Ayakkabı",
                mainImage: "https://via.placeholder.com/150",
              },
              quantity: 2,
              totalPrice: 60,
            },
            {
              id: "item2",
              product: {
                name: "Tişört",
                mainImage: "https://via.placeholder.com/150",
              },
              quantity: 1,
              totalPrice: 90,
            },
          ],
        },
      ];

      setOrders(SAHTE_SIPARISLER);
      setLoading(false);
    }, 1500); // 🔹 Skeletonu görmek için 1.5sn gecikme
  }, []);

  const handleCancelOrder = (orderId: string) => {
    setUpdating(true);
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "iptal edildi" } : o
        )
      );
      setSelectedOrder(null);
      setUpdating(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      {/* İçerik Alanı */}
      <div className="flex flex-1 justify-center items-start px-3 py-16 md:px-8 md:pt-16 bg-cover bg-center relative">
        <div className="w-full max-w-2xl space-y-6 relative z-10">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-bold text-gray-800">Siparişlerim</h2>
            <p className="text-gray-800">
              Siparişlerinizi buradan görüntüleyebilirsiniz
            </p>
          </motion.div>

          {/* Skeleton Yükleme Durumu */}
          {loading ? (
            <div className="space-y-6 mt-6">
              {[1, 2].map((i) => (
                <Card
                  key={i}
                  className="shadow-md border border-gray-200 p-6 space-y-4"
                >
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-28 rounded-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="p-4 rounded-md bg-blue-100 text-sm text-gray-600">
              Henüz bir siparişiniz bulunmuyor.
            </div>
          ) : (
            // 🔹 Siparişler
            <div className="space-y-6">
              {orders.map((order) => {
                const iptalEdilebilir =
                  order.status !== "iptal edildi" &&
                  order.status !== "kargoya verildi" &&
                  order.status !== "teslim edildi";

                return (
                  <Card
                    key={order.id}
                    className="shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white backdrop-blur-sm"
                  >
                    <CardHeader className="flex flex-col md:flex-row justify-between md:items-center p-6">
                      <div>
                        <CardTitle className="text-lg text-gray-800">
                          Sipariş No: {order.id}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString(
                            "tr-TR"
                          )}{" "}
                          •{" "}
                          {new Date(order.createdAt).toLocaleTimeString(
                            "tr-TR"
                          )}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-green-700 capitalize">
                        {order.status}
                      </span>
                    </CardHeader>

                    <CardContent className="space-y-6 p-6">
                      {/* Ödeme Bilgileri */}
                      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                        <p>
                          <strong>Ödenen Tutar:</strong> {order.paidPrice}{" "}
                          {order.currency}
                        </p>
                        <p>
                          <strong>Ödeme Yöntemi:</strong>{" "}
                          {order.paymentMethod || "—"}
                        </p>
                        <p>
                          <strong>İşlem No:</strong>{" "}
                          {order.transactionId || "—"}
                        </p>
                      </div>

                      {/* Ürünler */}
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between border-b pb-3"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.mainImage}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded-md border"
                              />
                              <div>
                                <p className="text-gray-700 font-medium line-clamp-1">
                                  {item.product.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Adet: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="text-teal-700 font-semibold">
                              {item.totalPrice} {order.currency}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Alt Satır */}
                      <div className="flex justify-between mt-4 items-center">
                        <p className="text-gray-800 font-bold">
                          Toplam: {order.totalPrice} {order.currency}
                        </p>

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
                                className="rounded-full px-4"
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
                                  {order.id} numaralı siparişi iptal etmek
                                  istediğinize emin misiniz?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="flex gap-2 justify-end">
                                <DialogClose asChild>
                                  <Button variant="outline">Hayır</Button>
                                </DialogClose>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleCancelOrder(order.id)}
                                  disabled={updating}
                                >
                                  Evet, İptal Et
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
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
