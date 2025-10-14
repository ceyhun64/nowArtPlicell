"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "@/components/admin/sideBar";
import AddProductDialog from "./addProduct";
import UpdateProductDialog from "./updateProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DefaultPagination from "@/components/layout/pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import productsData from "@/seed/products.json"; // JSON import

// === Tipler ===
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

export default function Products(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    id: 0,
    title: "",
    mainImage: "",
    subImage: "",
    pricePerM2: 0,
    rating: 0,
    reviewCount: 0,
    category: "",
  });

  const isMobile = useIsMobile();

  // JSON verisini state'e set et
  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Filtreleme + Arama
  const filteredProducts = products
    .filter((p) =>
      filter === "all"
        ? true
        : p.category.toLowerCase() === filter.toLowerCase()
    )
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * 15,
    currentPage * 15
  );

  // Yeni ürün ekleme
  const handleAddProduct = () => {
    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newItem: Product = {
      id: newId,
      title: newProduct.title,
      mainImage: newProduct.mainImage || "/images/sample.jpg",
      subImage: newProduct.subImage || "/images/sample.jpg",
      pricePerM2: newProduct.pricePerM2 || 0,
      rating: newProduct.rating || 0,
      reviewCount: newProduct.reviewCount || 0,
      category: newProduct.category || "other",
    };

    setProducts((prev) => [...prev, newItem]);

    setNewProduct({
      id: 0,
      title: "",
      mainImage: "",
      subImage: "",
      pricePerM2: 0,
      rating: 0,
      reviewCount: 0,
      category: "",
    });

    alert("✅ Ürün başarıyla eklendi (simülasyon).");
  };

  // Ürün silme
  const handleDelete = (id: number) => {
    if (!confirm("Bu ürünü silmek istiyor musunuz?")) return;
    setProducts(products.filter((p) => p.id !== id));
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  // Ürün güncelleme
  const handleUpdate = (updated: Product) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Tümünü seç
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Tek ürün seç
  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Seçilenleri sil
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Seçilen ${selectedIds.length} ürünü silmek istiyor musunuz?`))
      return;
    setProducts(products.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    alert("🗑️ Seçilen ürünler silindi (simülasyon).");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <main
        className={`flex-1 p-4 md:p-8 transition-all ${
          isMobile ? "" : "ml-64"
        }`}
      >
        {/* Başlık */}
        <div className="flex justify-between items-center mb-6 ms-12 mt-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#001e59]">
            Ürün Yönetimi
          </h1>
        </div>

        {/* Üst Araç Çubuğu */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                selectedIds.length > 0
                  ? "bg-[#001e59] text-white hover:bg-[#002e88]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              Seçilenleri Sil ({selectedIds.length})
            </Button>

            <AddProductDialog
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddProduct={handleAddProduct}
              className="w-full sm:w-auto"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-white border border-gray-200 text-gray-800 rounded-lg shadow-sm">
                <SelectValue placeholder="Kategori seç" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 text-gray-800 rounded-lg">
                <SelectItem value="all">Tüm Ürünler</SelectItem>
                <SelectItem value="DÜZ SERİ">DÜZ SERİ</SelectItem>
                <SelectItem value="DESENLİ SERİ">DESENLİ SERİ</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Ürün adına göre ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#001e59] focus:outline-none"
            />
          </div>
        </div>

        {/* Ürün Tablosu */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-md">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 text-[#001e59]">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length === paginatedProducts.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  ID
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  Ürün Adı
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  Kategori
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  Fiyat
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200">
                  Puan
                </th>
                <th className="px-4 py-3 font-medium border-b border-gray-200 text-center">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-all border-b border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={() => handleSelectOne(product.id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-700">{product.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {product.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-[#001e59] font-semibold">
                    {product.pricePerM2} TL
                  </td>
                  <td className="px-4 py-3 text-gray-800">{product.rating}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <UpdateProductDialog
                        product={product}
                        onUpdate={handleUpdate}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="bg-[#ff3b30] hover:bg-[#ff453a] text-white px-3 py-1.5 rounded-lg text-xs transition-all shadow-sm"
                      >
                        Sil
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sayfalama */}
        <div className="mt-6 flex justify-center">
          <DefaultPagination
            totalItems={filteredProducts.length}
            itemsPerPage={15}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
