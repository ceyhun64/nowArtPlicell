"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { CartItemType } from "./cartDropdown";
import { Card, CardContent } from "@/components/ui/card";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalPrice =
    (item.product.pricePerM2 || 0) * (item.m2 || 1) * (item.quantity || 1);

  return (
    <Card className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
      <CardContent className="py-0 ">
        {" "}
        {/* Üst satır: resim + isim */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={item.product.mainImage}
              alt={item.product.title}
              className="w-14 h-14 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-800 text-sm">
                {item.product.title}
              </span>
              <span className="text-gray-500 text-xs">
                TL{((item.product.pricePerM2 || 0) * (item.m2 || 1)).toFixed(2)}{" "}
                x {item.quantity}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 p-1"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {/* Quantity ve toplam fiyat */}
        <div className="flex items-center justify-between mt-2 mb-2 text-sm">
          <span className="font-semibold text-gray-800">
            TL{totalPrice.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              className="p-1"
              onClick={() => onQuantityChange(item.id, -1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-medium">{item.quantity}</span>
            <Button
              size="sm"
              variant="outline"
              className="p-1"
              onClick={() => onQuantityChange(item.id, 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        {/* Detaylar: açılır */}
        {isExpanded && (
          <div className="mt-2 text-xs text-gray-500 space-y-1 border-t border-gray-200 pt-2">
            {item.m2 && <div>Alan: {item.m2} m²</div>}
            {item.width && item.height && (
              <div>
                Boyut: {item.width} x {item.height} cm
              </div>
            )}
            {item.device && <div>Cihaz: {item.device}</div>}
            {item.profile && <div>Profil: {item.profile}</div>}
            {item.note && <div>Not: {item.note}</div>}
          </div>
        )}
        {/* Toggle ok butonu: detayların hemen altında, alt boşluk yok */}
        <Button
          variant="ghost"
          className="w-full flex justify-center items-center p-2 bg-gray-50 transition-colors mt-1 mb-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartItem;
