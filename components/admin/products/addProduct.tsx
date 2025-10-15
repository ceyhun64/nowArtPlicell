"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface NewProduct {
  id: number;
  title: string;
  mainImage: string;
  subImage: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  category: string;
}

interface AddProductDialogProps {
  newProduct: NewProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>;
  handleAddProduct: () => void;
  className?: string;
}

export default function AddProductDialog({
  newProduct,
  setNewProduct,
  handleAddProduct,
  className,
}: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
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
    const url = file ? URL.createObjectURL(file) : "";
    if (isMain) setNewProduct({ ...newProduct, mainImage: url });
    else setNewProduct({ ...newProduct, subImage: url });
  };

  const handleSubmit = () => {
    handleAddProduct();
    setOpen(false);
  };

  return (
    <>
      <Button
        className={`bg-[#92e676] hover:bg-[#001e59] text-white font-medium ${className}`}
        onClick={() => setOpen(true)}
      >
        Yeni Ürün Ekle
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-gray-900 max-w-4xl border border-gray-300 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#001e59]">
              Yeni Ürün Ekle
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-8 mt-4">
            {/* Sol Form */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Ürün Adı</Label>
                <Input
                  name="title"
                  value={newProduct.title}
                  onChange={handleChange}
                  placeholder="Ürün adı girin"
                  className="bg-gray-100 border border-gray-300 text-gray-900 w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Kategori</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(val) =>
                    setNewProduct({ ...newProduct, category: val })
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
                <Label className="text-sm font-medium">Ana Görsel</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, true)}
                  className="bg-gray-100 border border-gray-300 p-2 rounded w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Alt Görsel</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                  className="bg-gray-100 border border-gray-300 p-2 rounded w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Fiyat (m²)</Label>
                <Input
                  name="pricePerM2"
                  type="number"
                  value={newProduct.pricePerM2}
                  onChange={handleChange}
                  placeholder="Fiyat"
                  className="bg-gray-100 border border-gray-300 text-gray-900 w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Puan</Label>
                <Input
                  name="rating"
                  type="number"
                  value={newProduct.rating}
                  onChange={handleChange}
                  placeholder="Puan"
                  className="bg-gray-100 border border-gray-300 text-gray-900 w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">İnceleme Sayısı</Label>
                <Input
                  name="reviewCount"
                  type="number"
                  value={newProduct.reviewCount}
                  onChange={handleChange}
                  placeholder="İnceleme Sayısı"
                  className="bg-gray-100 border border-gray-300 text-gray-900 w-full"
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
                    {newProduct.mainImage ? (
                      <img
                        src={newProduct.mainImage}
                        alt="Main"
                        className="w-40 h-60 object-cover rounded-lg border border-gray-300"
                      />
                    ) : (
                      <div className="w-40 h-60 flex items-center justify-center bg-gray-200 rounded-lg text-gray-400">
                        Ana Görsel
                      </div>
                    )}
                  </div>

                  <div className="w-20 h-28 bg-gray-200 rounded flex items-center justify-center overflow-hidden border border-gray-300">
                    {newProduct.subImage ? (
                      <img
                        src={newProduct.subImage}
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
                    {newProduct.title || "Ürün Adı"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {newProduct.category || "Kategori"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Fiyat: {newProduct.pricePerM2 || "-"} TL / m²
                  </p>
                  <p className="text-sm text-gray-600">
                    Puan: {newProduct.rating || "-"} | İnceleme:{" "}
                    {newProduct.reviewCount || "-"}
                  </p>
                </CardContent>
              </motion.div>
            )}
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-3">
            <Button
              onClick={() => setOpen(false)}
              variant={"outline"}
            >
              İptal
            </Button>
            <Button
              className="bg-[#92e676] hover:bg-[#001e59] text-white font-medium"
              onClick={handleSubmit}
            >
              Ürünü Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
