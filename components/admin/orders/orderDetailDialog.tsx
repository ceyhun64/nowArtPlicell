// OrderDetailDialog.tsx

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Package, Truck, ArrowRight } from "lucide-react";

// === TİP TANIMLARI (Orders.tsx ile birebir uyumlu) =========================

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

interface OrderDetailDialogProps {
  order: FormattedOrder | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<FormattedOrder | null>>;
  onUpdateStatus: (
    orderId: number,
    currentStatus: FormattedOrder["status"]
  ) => Promise<void>;
  getStatusInTurkish: (status: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  getNextStatus: (
    currentStatus: FormattedOrder["status"]
  ) => FormattedOrder["status"] | null; // 🔹 Burayı güncelledik
}

// === BİLEŞEN ================================================================

export default function OrderDetailDialog({
  order,
  setSelectedOrder,
  onUpdateStatus,
  getStatusInTurkish,
  getStatusBadge,
  getNextStatus,
}: OrderDetailDialogProps): React.JSX.Element | null {
  if (!order) return null;

  const nextStatus = getNextStatus(order.status);
  const canUpdateStatus = !!nextStatus;

  return (
    <DialogContent className="bg-white text-gray-900 max-w-[95vw] sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-lg shadow-lg">
      <DialogHeader>
        <DialogTitle className="text-xl sm:text-2xl text-gray-800">
          Sipariş #{order.id} Detayı
        </DialogTitle>
        <DialogDescription className="text-gray-500 text-sm break-all">
          {order.customer} - {order.email}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-sm">
        {/* --- ÖDEME & DURUM --- */}
        <div className="md:col-span-2">
          <h3 className="text-base font-semibold mb-3 border-b border-gray-200 pb-1 flex items-center gap-2 text-gray-700">
            <Wallet className="w-4 h-4" /> Ödeme ve Durum
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex justify-between items-center">
              <strong className="text-gray-500">Durum:</strong>
              {getStatusBadge(order.status)}
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-500">Oluşturma Tarihi:</strong>
              <span>{order.createdAt}</span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-500">Ödenen Tutar:</strong>
              <span className="font-bold text-green-600">
                {order.paidPrice}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-500">Toplam Sepet Değeri:</strong>
              <span>{order.totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-500">Ödeme Yöntemi:</strong>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-500">İşlem ID:</strong>
              <span className="truncate max-w-[50%] text-right">
                {order.transactionId}
              </span>
            </div>
          </div>

          {canUpdateStatus && (
            <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
              <Button
                onClick={() => onUpdateStatus(order.id, order.status)}
                className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1 w-full sm:w-auto text-sm text-white"
              >
                <ArrowRight className="w-4 h-4" />
                Durumu Güncelle: {getStatusInTurkish(nextStatus!)}
              </Button>
            </div>
          )}
          {!canUpdateStatus && order.status !== "cancelled" && (
            <p className="mt-4 pt-3 border-t border-gray-200 text-right text-gray-500 text-xs">
              Bu siparişin durumu (**{getStatusInTurkish(order.status)}**) daha
              fazla otomatik ilerletilemez.
            </p>
          )}
          {order.status === "cancelled" && (
            <p className="mt-4 pt-3 border-t border-gray-200 text-right text-red-500 text-xs">
              Bu sipariş iptal edilmiştir ve durumu değiştirilemez.
            </p>
          )}
        </div>

        <hr className="col-span-2 border-gray-200 my-2" />

        {/* --- ÜRÜNLER --- */}
        <div className="md:col-span-2">
          <h3 className="text-base font-semibold mb-3 border-b border-gray-200 pb-1 flex items-center gap-2 text-gray-700">
            <Package className="w-4 h-4" /> Sipariş Ürünleri (
            {order.items.length} adet)
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-gray-50"
              >
                <img
                  src={item.mainImage}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-gray-500 text-xs">
                    Birim Fiyat: {item.unitPrice}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">x{item.quantity}</p>
                  <p className="text-xs text-gray-600">{item.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="col-span-2 border-gray-200 my-2" />

        {/* --- ADRES --- */}
        <div className="md:col-span-2">
          <h3 className="text-base font-semibold mb-3 border-b border-gray-200 pb-1 flex items-center gap-2 text-gray-700">
            <Truck className="w-4 h-4" /> Kargo Adresi
          </h3>
          {order.address ? (
            <div className="bg-gray-50 p-3 rounded-lg text-xs sm:text-sm space-y-1 border border-gray-200">
              <p>
                <strong>Adres Tipi:</strong> {order.address.type}
              </p>
              <p>
                <strong>Adres:</strong> {order.address.street}
              </p>
              <p>
                <strong>Şehir / Ülke:</strong> {order.address.city} /{" "}
                {order.address.country}
              </p>
            </div>
          ) : (
            <p className="text-red-500 text-xs">Kargo adresi bulunamadı.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={() => setSelectedOrder(null)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-900 text-sm"
        >
          Kapat
        </Button>
      </div>
    </DialogContent>
  );
}
