"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "./productCard";
import { Input } from "@/components/ui/input";
import { X, Search, Trash } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import products from "@/seed/products.json";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  mainImage: string;
  subImage: string;
  description: string;
  oldPrice: number;
  price: number;
  discount: number;
}

export default function DefaultSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <div className="p-4 md:p-8">
      {/* Üst Bar */}
      <div className="flex items-center justify-between mb-8 md:mb-16 gap-4">
        {/* Desktop: Logo */}
        {!isMobile && (
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-stone-900 tracking-wide  transition-colors"
          >
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={100}
              height={100}
            ></Image>
          </Link>
        )}

        <div className="flex items-center gap-2 w-full relative">
          {/* Input + Clear button */}
          <div className="flex-1 relative">
            {/* Search ikonu */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />

            <Input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10" // sol padding ikonu, sağ padding clear butonu
            />

            {/* Input içinde silme butonu */}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
              >
                <Trash className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Inputun dışında hep sağda: sayfayı kapatma/back butonu */}
          <button
            onClick={() => router.back()}
            className="p-2 rounded hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Ürün Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products
          .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              mainImage={product.mainImage}
              subImage={product.subImage}
              pricePerM2={product.pricePerM2}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          ))}
      </div>
    </div>
  );
}
