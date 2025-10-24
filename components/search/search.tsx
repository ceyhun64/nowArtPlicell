"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "./productCard";
import { Input } from "@/components/ui/input";
import { X, Search, Trash } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Loading from "../layout/loading"; // varsa, loading component'in

interface Product {
  id: number;
  title: string;
  mainImage: string;
  subImage?: string;
  description?: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  category?: string;
  subcategory?: string;
}

export default function DefaultSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const isMobile = useIsMobile();

  // === Ürünleri API'den çek ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Ürünler alınamadı");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Ürün çekme hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // === Arama ===
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    return products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8">
      {/* Üst Bar */}
      <div className="flex items-center justify-between mb-8 md:mb-16 gap-4">
        {/* Desktop Logo */}
        {!isMobile && (
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-stone-900 tracking-wide transition-colors"
          >
            <Image
              src="/logo/logo.webp"
              alt="Logo"
              width={411}
              height={294}
              style={{ width: 80, height: "auto" }}
            />
          </Link>
        )}

        {/* Arama input alanı */}
        <div className="flex items-center gap-2 w-full relative">
          <div className="flex-1 relative">
            {/* Search Icon */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />

            <Input
              type="text"
              placeholder="Ürün ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10"
            />

            {/* Clear Button */}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                aria-label="Aramayı temizle"
              >
                <Trash className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Geri dön butonu */}
          <button
            onClick={() => router.back()}
            className="p-2 rounded hover:bg-gray-200 transition"
            aria-label="Arama sayfasını kapat"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Ürün Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              mainImage={product.mainImage}
              subImage={product.subImage || ""}
              pricePerM2={product.pricePerM2}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          ))}
        </div>
      ) : (
        <div className="p-10 text-center text-gray-500 text-lg bg-white rounded-2xl border border-gray-100 shadow-sm">
          Aramanıza uygun ürün bulunamadı.
        </div>
      )}
    </div>
  );
}
