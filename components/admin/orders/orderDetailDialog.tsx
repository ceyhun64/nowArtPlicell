"use client";

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Package, Truck, ArrowRight } from "lucide-react";
import { FormattedOrder, OrderItem, Address } from "@/types/order";

interface Props {
  order: FormattedOrder | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<FormattedOrder | null>>;
  onUpdateStatus: (
    orderId: number,
    currentStatus: FormattedOrder["status"]
  ) => void;
  getStatusInTurkish: (status: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  getNextStatus: (
    currentStatus: FormattedOrder["status"]
  ) => FormattedOrder["status"] | null;
}

export default function OrderDetailDialog({
  order,
  setSelectedOrder,
  onUpdateStatus,
  getStatusInTurkish,
  getStatusBadge,
  getNextStatus,
}: Props) {
  if (!order) return null;
  console.log(order);

  const nextStatus = getNextStatus(order.status);

  const shippingAddress = order.addresses.find((a) => a.type === "shipping");
  const billingAddress = order.addresses.find((a) => a.type === "billing");

  return (
    <DialogContent className="bg-white text-gray-900 max-w-[95vw] sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold text-gray-800">
          Sipariş #{order.id} Detayı
        </DialogTitle>
        <DialogDescription className="text-gray-500 text-sm truncate">
          {order.user.name} {order.user.surname} &bull; {order.user.email}
        </DialogDescription>
      </DialogHeader>

      {/* Ödeme ve Durum */}
      <div className="my-5 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <Wallet className="w-5 h-5" /> Ödeme & Durum
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span>Durum:</span>
            {getStatusBadge(order.status)}
          </div>
          <div className="flex justify-between">
            <span>Oluşturma:</span>
            {new Date(order.createdAt).toLocaleString("tr-TR")}
          </div>
          <div className="flex justify-between">
            <span>Toplam Tutar:</span>
            {order.totalPrice.toLocaleString("tr-TR")} ₺
          </div>
          <div className="flex justify-between">
            <span>Ödenen Tutar:</span>
            {order.paidPrice.toLocaleString("tr-TR")} ₺
          </div>
          <div className="flex justify-between">
            <span>Ödeme Yöntemi:</span>
            {order.paymentMethod}
          </div>
          <div className="flex justify-between">
            <span>İşlem ID:</span>
            {order.transactionId || "-"}
          </div>
        </div>

        {nextStatus && (
          <div className="flex justify-end mt-3">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              onClick={() => onUpdateStatus(order.id, order.status)}
            >
              <ArrowRight className="w-4 h-4" />{" "}
              {getStatusInTurkish(nextStatus)}'a Geç
            </Button>
          </div>
        )}
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Ürünler */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <Package className="w-5 h-5" /> Sipariş Ürünleri ({order.items.length}
          )
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
            >
              <img
                src={item.product.mainImage}
                alt={item.product.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0 text-sm space-y-0.5">
                <p className="font-medium truncate">{item.product.title}</p>

                {item.profile && (
                  <p className="text-gray-500 text-xs">
                    Profil: {item.profile}
                  </p>
                )}
                {item.width && item.height && (
                  <p className="text-gray-500 text-xs">
                    Genişlik x Yükseklik: {item.width}x{item.height} cm
                  </p>
                )}
                {item.m2 && (
                  <p className="text-gray-500 text-xs">m²: {item.m2}</p>
                )}
                {item.device && (
                  <p className="text-gray-500 text-xs">Aparat: {item.device}</p>
                )}
                {item.note && (
                  <p className="text-gray-500 text-xs">Not: {item.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Adresler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["shipping", "billing"].map((type) => {
          const addr = order.addresses.find((a) => a.type === type);
          const title = type === "shipping" ? "Kargo Adresi" : "Fatura Adresi";
          return (
            <div key={type}>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <Truck className="w-5 h-5" /> {title}
              </h3>
              {addr ? (
                <div className="p-3 bg-gray-50 border rounded-lg text-sm space-y-1">
                  <p>Adres Tipi: {addr.type}</p>
                  <p>
                    Alıcı: {addr.firstName} {addr.lastName}
                  </p>
                  <p>Tc. No: {addr.tcno}</p>

                  <p>Adres: {addr.address}</p>
                  <p>
                    Şehir / Ülke: {addr.city} / {addr.country}
                  </p>
                  {addr.district && <p>İlçe: {addr.district}</p>}
                  {addr.zip && <p>ZIP: {addr.zip}</p>}
                  {addr.phone && <p>Telefon: {addr.phone}</p>}
                </div>
              ) : (
                <p className="text-red-500 text-sm">Adres bulunamadı</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-5">
        <Button
          onClick={() => setSelectedOrder(null)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-900"
        >
          Kapat
        </Button>
      </div>
    </DialogContent>
  );
}
