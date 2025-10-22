"use client";

import React, { useState, ChangeEvent, forwardRef } from "react";
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
import Image from "next/image";

export interface ProductFormData {
  title: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  category: string;
}

interface AddProductDialogProps {
  onSubmit: (formData: ProductFormData, mainFile: File, subFile?: File) => void;
  className?: string;
}

const AddProductDialog = forwardRef<HTMLDivElement, AddProductDialogProps>(
  ({ onSubmit, className }, ref) => {
    const [open, setOpen] = useState(false);
    const [productData, setProductData] = useState<ProductFormData>({
      title: "",
      pricePerM2: 0,
      rating: 0,
      reviewCount: 0,
      category: "",
    });
    const [mainFile, setMainFile] = useState<File | null>(null);
    const [subFile, setSubFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProductData((prev) => ({
        ...prev,
        [name]: name === "pricePerM2" ? Number(value) : value,
      }));
    };

    const handleFileChange = (
      e: ChangeEvent<HTMLInputElement>,
      isMain = false
    ) => {
      const file = e.target.files?.[0] || null;
      if (isMain) setMainFile(file);
      else setSubFile(file);
    };

    const resetForm = () => {
      setProductData({
        title: "",
        pricePerM2: 0,
        rating: 0,
        reviewCount: 0,
        category: "",
      });
      setMainFile(null);
      setSubFile(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!productData.title || !mainFile || !subFile || !productData.category)
        return;
      onSubmit(productData, mainFile, subFile || undefined);
      resetForm();
      setOpen(false);
    };

    const getPreviewUrl = (file: File | null) =>
      file ? URL.createObjectURL(file) : null;

    return (
      <>
        <Button
          className={`bg-[#92e676] hover:bg-[#001e59] text-white font-medium ${className}`}
          onClick={() => {
            setOpen(true);
            resetForm();
          }}
        >
          Yeni Ürün Ekle
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          {/* sm:max-h-[90vh] ve sm:overflow-y-auto sınıfları diyaloğun yüksekliğini mobil ekranla sınırlar */}
          <DialogContent className="bg-white text-gray-900 max-w-5xl w-full border border-gray-300 rounded-2xl shadow-2xl sm:max-h-[90vh] sm:overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#001e59]">
                Yeni Ürün Ekle
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              {/* Ana İki Sütunlu Düzenleyici (Mobil: Tek Sütun, MD: İki Sütun) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mt-4">
                {/* Sol: Form Alanı */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
                  {/* Input Grubu: Ürün Adı, Kategori ve Fiyat (Mobil: 2 sütun, MD: 1 sütun) */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1 md:gap-5">
                    {/* Ürün Adı */}
                    <div className="col-span-1 md:col-span-full">
                      <Label className="text-sm font-semibold text-[#001e59]">
                        Ürün Adı
                      </Label>
                      <Input
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        placeholder="Ürün adı girin"
                        required
                        className="mt-1"
                      />
                    </div>

                    {/* Kategori */}
                    <div className="col-span-1 md:col-span-full">
                      <Label className="text-sm font-semibold text-[#001e59]">
                        Kategori
                      </Label>
                      <Select
                        value={productData.category}
                        onValueChange={(val) =>
                          setProductData((prev) => ({ ...prev, category: val }))
                        }
                      >
                        <SelectTrigger className="mt-1 w-full">
                          <SelectValue placeholder="Kategori Seç" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plicell">PLICELL</SelectItem>
                          <SelectItem value="zebra">ZEBRA</SelectItem>
                          <SelectItem value="stor">STOR</SelectItem>
                          <SelectItem value="ahsap-jaluzi">
                            AHŞAP JALUZİ
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Fiyat (m²) */}
                    <div className="col-span-2 md:col-span-full">
                      <Label className="text-sm font-semibold text-[#001e59]">
                        Fiyat (m²)
                      </Label>
                      <Input
                        name="pricePerM2"
                        type="number"
                        value={productData.pricePerM2}
                        onChange={handleChange}
                        placeholder="Örnek: 199"
                        min="0"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* YENİ DEĞİŞİKLİK: Görsel Seçim Inputları mobil'de 2 sütunlu grid yapıldı. 
                MD'de yine alt alta gelmesi için 'md:flex-col' ve 'md:gap-5' sınıfları eklendi.
            */}
                  <div className="grid grid-cols-2 gap-x-4 mt-3 md:grid-cols-1 md:gap-5 md:mt-5">
                    {/* Ana Görsel */}
                    <div>
                      <Label className="text-sm font-semibold text-[#001e59]">
                        Ana Görsel
                      </Label>
                      <label className="block mt-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, true)}
                          className="hidden"
                          id="mainImageInput"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("mainImageInput")?.click()
                          }
                          className="w-full"
                        >
                          {mainFile ? mainFile.name : "Ana Görsel Seç"}
                        </Button>
                      </label>
                    </div>

                    {/* Alt Görsel */}
                    <div>
                      <Label className="text-sm font-semibold text-[#001e59]">
                        Alt Görsel
                      </Label>
                      <label className="block mt-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, false)}
                          className="hidden"
                          id="subImageInput"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("subImageInput")?.click()
                          }
                          className="w-full"
                        >
                          {subFile ? subFile.name : "Alt Görsel Seç"}
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Sağ: Önizleme */}
                <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-4 sm:p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-[#001e59] text-center">
                    Ürün Önizleme
                  </h3>

                  {/* Önizleme Görselleri (Mobil ve MD'de yan yana) */}
                  <div className="flex flex-row items-center justify-center gap-4">
                    <div className="relative w-full sm:w-full md:w-40 h-40 rounded-lg overflow-hidden border border-dashed border-gray-300">
                      {getPreviewUrl(mainFile) ? (
                        <Image
                          src={getPreviewUrl(mainFile)!}
                          alt="Ana Görsel"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          Ana Görsel
                        </div>
                      )}
                    </div>

                    <div className="relative w-full sm:w-full md:w-40 h-40 rounded-lg overflow-hidden border border-dashed border-gray-300">
                      {getPreviewUrl(subFile) ? (
                        <Image
                          src={getPreviewUrl(subFile)!}
                          alt="Alt Görsel"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          Alt Görsel
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ürün adı, kategori ve fiyat */}
                  <div className="text-center mt-4">
                    <p className="text-lg font-semibold">
                      {productData.title || "Ürün adı"}
                    </p>
                    <p className="text-gray-600">
                      {productData.category
                        ? productData.category.toUpperCase()
                        : "Kategori seçilmedi"}
                    </p>
                    <p className="text-[#001e59] font-semibold mt-1">
                      {productData.pricePerM2 > 0
                        ? `${productData.pricePerM2} TL / m²`
                        : "Fiyat belirtilmedi"}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 flex flex-col sm:flex-col md:flex-row justify-end gap-3">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  disabled={loading}
                >
                  İptal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Ekleniyor..." : "Ürünü Ekle"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

export default AddProductDialog;
