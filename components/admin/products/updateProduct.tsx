"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface Product {
  id: number;
  title: string;
  mainImage: string;
  subImage: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  category: string;
}

interface UpdateProductDialogProps {
  product: Product;
  onUpdate: (updated: Product) => void;
}

export default function UpdateProductDialog({
  product,
  onUpdate,
}: UpdateProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Product>(product);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "pricePerM2" || name === "rating" || name === "reviewCount"
          ? Number(value)
          : value,
    });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    isMain = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData({ ...formData, [isMain ? "mainImage" : "subImage"]: url });
  };

  const handleSave = () => {
    onUpdate(formData);
    alert("✅ Ürün güncellendi (simülasyon).");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-[#92e676] hover:bg-[#001e59] text-white"
        >
          Güncelle
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-gray-900 max-w-4xl border border-gray-300 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#001e59]">
            Ürünü Güncelle
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-8 mt-4">
          {/* Sol Form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-sm font-medium">Başlık</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 w-full"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Kategori</Label>
              <Select
                value={formData.category}
                onValueChange={(val) =>
                  setFormData({ ...formData, category: val })
                }
              >
                <SelectTrigger className="bg-gray-100 border border-gray-300 text-gray-900 w-full">
                  <SelectValue placeholder="Kategori Seç" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 text-gray-900">
                  <SelectItem value="DÜZ SERİ">DÜZ SERİ</SelectItem>
                  <SelectItem value="DESENLİ SERİ">DESENLİ SERİ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Fiyat (TL/m²)</Label>
              <Input
                name="pricePerM2"
                type="number"
                value={formData.pricePerM2}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 w-full"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Rating</Label>
              <Input
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 w-full"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Review Count</Label>
              <Input
                name="reviewCount"
                type="number"
                value={formData.reviewCount}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 w-full"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-sm font-medium">Ana Görsel</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, true)}
                className="bg-gray-100 border border-gray-300 p-2 rounded w-full"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-sm font-medium">Alt Görsel</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                className="bg-gray-100 border border-gray-300 p-2 rounded w-full"
              />
            </div>
          </div>

          {/* Sağ Önizleme */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 border border-gray-300 rounded-xl p-4 bg-gray-50 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-[#001e59] mb-3">
                Ürün Önizlemesi
              </h3>

              <div className="flex gap-4 mb-4">
                <div className="flex-shrink-0">
                  {formData.mainImage ? (
                    <img
                      src={formData.mainImage}
                      alt="Main"
                      className="w-40 h-60 object-cover rounded-lg border border-gray-300"
                    />
                  ) : (
                    <div className="w-40 h-60 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                      Ana Görsel
                    </div>
                  )}
                </div>

                <div className="w-40 h-60 bg-gray-200 rounded flex items-center justify-center overflow-hidden border border-gray-300">
                  {formData.subImage ? (
                    <img
                      src={formData.subImage}
                      alt="Sub"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">Alt Görsel</span>
                  )}
                </div>
              </div>

              <CardContent className="p-3 bg-white border-t border-gray-300 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900">
                  {formData.title || "Ürün Başlığı"}
                </h3>
                <p className="text-sm text-gray-500">
                  {formData.category || "Kategori"}
                </p>
                <p className="text-sm text-gray-600">
                  Fiyat: {formData.pricePerM2} TL/m²
                </p>
              </CardContent>
            </motion.div>
          )}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            onClick={() => setOpen(false)}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            İptal
          </Button>
          <Button
            className="bg-[#92e676] hover:bg-[#001e59] text-white font-medium"
            onClick={handleSave}
          >
            Güncelle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
