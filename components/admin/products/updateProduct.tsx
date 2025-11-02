"use client";

import React, { useState, useEffect, useId, ChangeEvent } from "react";
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
  subCategory?: string;
  subCategoryId?: string; // yeni ID alanı
  mainImage?: string;
  subImage?: string;
}

interface UpdateProductDialogProps {
  product: ProductFormData;
  onUpdate: (
    data: ProductFormData,
    mainFile?: File,
    subFile?: File
  ) => Promise<void> | void;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateProductDialog({
  product,
  onUpdate,
  open,
  onOpenChange,
}: UpdateProductDialogProps) {
  const id = useId();
  console.log("product:", product);

  const [productData, setProductData] = useState<ProductFormData>({
    title: "",
    pricePerM2: 0,
    rating: 0,
    reviewCount: 0,
    category: "",
    subCategory: "",
    subCategoryId: "",
    mainImage: "",
    subImage: "",
  });

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [subFile, setSubFile] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [subPreview, setSubPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const plicellSubCategories = [
    { id: "1", name: "Bella" },
    { id: "2", name: "Valeria" },
    { id: "3", name: "Spark" },
    { id: "4", name: "Merlin" },
    { id: "5", name: "Duble Linen" },
    { id: "6", name: "Elegant" },
    { id: "7", name: "Dimout" },
    { id: "8", name: "Blackout" },
    { id: "9", name: "Honeycomb20" },
    { id: "10", name: "Honeycomb16" },
  ];

  const filenameFromUrl = (url?: string) => {
    if (!url) return null;
    try {
      const clean = url.split("?")[0];
      const parts = clean.split("/");
      return decodeURIComponent(parts[parts.length - 1]);
    } catch {
      return url;
    }
  };

  // product değiştiğinde formu güncelle
  useEffect(() => {
    if (product) {
      let subCategoryName = product.subCategory || "";

      // subCategoryId varsa bul ve alt kategori adını ata
      if (
        product.subCategoryId !== undefined &&
        product.subCategoryId !== null
      ) {
        const idStr = product.subCategoryId.toString();
        const found = plicellSubCategories.find((sub) => sub.id === idStr);
        if (found) subCategoryName = found.name;
      }

      setProductData({
        title: product.title || "",
        pricePerM2: product.pricePerM2 || 0,
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        category: product.category || "",
        subCategory: subCategoryName,
        subCategoryId: product.subCategoryId?.toString() || "",
        mainImage: product.mainImage || "",
        subImage: product.subImage || "",
      });

      setMainFile(null);
      setSubFile(null);
      setMainPreview(null);
      setSubPreview(null);
    }
  }, [product]);

  // Dosya değişimi önizleme
  useEffect(() => {
    if (mainFile) {
      const url = URL.createObjectURL(mainFile);
      setMainPreview(url);
      return () => URL.revokeObjectURL(url);
    } else setMainPreview(null);
  }, [mainFile]);

  useEffect(() => {
    if (subFile) {
      const url = URL.createObjectURL(subFile);
      setSubPreview(url);
      return () => URL.revokeObjectURL(url);
    } else setSubPreview(null);
  }, [subFile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        name === "pricePerM2" || name === "rating" || name === "reviewCount"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    isMain = true
  ) => {
    const file = e.target.files?.[0] || null;
    if (isMain) setMainFile(file);
    else setSubFile(file);
  };

  const getPreviewSrc = (filePreview: string | null, fallbackUrl?: string) =>
    filePreview || fallbackUrl || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productData.title || !productData.category) return;

    // Plicell için alt kategori seçilmedi ise uyar
    if (productData.category === "Plicell" && !productData.subCategoryId) {
      alert("Plicell için alt kategori seçmelisiniz!");
      return;
    }

    try {
      setLoading(true);

      // Plicell dışı kategori ise alt kategori null gönder
      const submitData = {
        ...productData,
        subCategory:
          productData.category === "Plicell" ? productData.subCategory : "null",
        subCategoryId:
          productData.category === "Plicell"
            ? productData.subCategoryId
            : "null",
      };

      await onUpdate(submitData, mainFile || undefined, subFile || undefined);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-gray-900 max-w-5xl w-full border border-gray-300 rounded-2xl shadow-2xl sm:max-h-[90vh] sm:overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#001e59]">
            Ürünü Güncelle
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mt-4">
            {/* Form Alanları */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
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
                      setProductData((prev) => ({
                        ...prev,
                        category: val,
                        // Plicell değilse alt kategori ve ID'yi boş yap
                        subCategory: val === "Plicell" ? prev.subCategory : "",
                        subCategoryId:
                          val === "Plicell" ? prev.subCategoryId : "",
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Kategori Seç" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Plicell">Plicell</SelectItem>
                      <SelectItem value="Zebra">Zebra</SelectItem>
                      <SelectItem value="Stor">Stor</SelectItem>
                      <SelectItem value="Ahsap-Jaluzi">Ahşap Jaluzi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Alt Kategori */}
                {productData.category === "Plicell" && (
                  <div className="col-span-1 md:col-span-full">
                    <Label className="text-sm font-semibold text-[#001e59]">
                      Alt Kategori
                    </Label>
                    <Select
                      value={productData.subCategoryId || ""}
                      onValueChange={(val) => {
                        const selected = plicellSubCategories.find(
                          (sub) => sub.id === val
                        );
                        setProductData((prev) => ({
                          ...prev,
                          subCategoryId: val,
                          subCategory: selected?.name || "",
                        }));
                      }}
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Alt Kategori Seç" />
                      </SelectTrigger>
                      <SelectContent>
                        {plicellSubCategories.map((sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.name.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Fiyat */}
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

              {/* Görseller */}
              <div className="grid grid-cols-2 gap-x-4 mt-3 md:grid-cols-1 md:gap-5 md:mt-5">
                <div>
                  <Label className="text-sm font-semibold text-[#001e59]">
                    Ana Görsel
                  </Label>
                  <label className="block mt-1">
                    <input
                      id={`mainImageInput-${id}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, true)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById(`mainImageInput-${id}`)?.click()
                      }
                      className="w-full"
                    >
                      Yeni Ana Görsel Seç
                    </Button>
                    {!mainFile && productData.mainImage && (
                      <p className="text-xs text-gray-500 mt-1">
                        Mevcut: {filenameFromUrl(productData.mainImage)}
                      </p>
                    )}
                  </label>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-[#001e59]">
                    Alt Görsel
                  </Label>
                  <label className="block mt-1">
                    <input
                      id={`subImageInput-${id}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, false)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById(`subImageInput-${id}`)?.click()
                      }
                      className="w-full"
                    >
                      Yeni Alt Görsel Seç
                    </Button>
                    {!subFile && productData.subImage && (
                      <p className="text-xs text-gray-500 mt-1">
                        Mevcut: {filenameFromUrl(productData.subImage)}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Önizleme */}
            <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-4 sm:p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-[#001e59] text-center">
                Ürün Önizleme
              </h3>

              <div className="flex flex-row items-center justify-center gap-4">
                <div className="relative w-full sm:w-full md:w-40 h-40 rounded-lg overflow-hidden border border-dashed border-gray-300 flex items-center justify-center">
                  {getPreviewSrc(mainPreview, productData.mainImage) ? (
                    <Image
                      src={getPreviewSrc(mainPreview, productData.mainImage)!}
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

                <div className="relative w-full sm:w-full md:w-40 h-40 rounded-lg overflow-hidden border border-dashed border-gray-300 flex items-center justify-center">
                  {getPreviewSrc(subPreview, productData.subImage) ? (
                    <Image
                      src={getPreviewSrc(subPreview, productData.subImage)!}
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

          <DialogFooter className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              disabled={loading}
            >
              İptal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Kaydediliyor..." : "Güncelle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
