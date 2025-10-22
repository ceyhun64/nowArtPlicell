"use client";

import * as React from "react";
import ProductCard from "./productCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductData {
  id: number;
  title: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  subImage: string;
  category: string;
}

export default function MostPreferred() {
  const [products, setProducts] = React.useState<ProductData[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // API'den veri çekme
  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products) {
          // Rastgele 6 ürün seç
          const shuffled = data.products.sort(() => 0.5 - Math.random());
          setProducts(shuffled.slice(0, 8));
        }
      } catch (err) {
        console.error("Ürünleri çekerken hata:", err);
      }
    }
    fetchProducts();
  }, []);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  return (
    <section className="mx-auto w-full max-w-8xl px-4 sm:px-8 lg:px-12 py-8 md:py-16 bg-gray-50 font-serif rounded-3xl relative">
      {/* Başlık ve oklar */}
      <div className="flex items-center justify-center md:justify-between mb-4 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 text-center tracking-tight">
          En Çok Tercih Edilenler
        </h2>

        <div className="hidden md:flex space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="rounded-full p-3 border-gray-300 hover:bg-gray-100 transition-transform hover:scale-110 shadow-sm"
            aria-label="Önceki"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="rounded-full p-3 border-gray-300 hover:bg-gray-100 transition-transform hover:scale-110 shadow-sm"
            aria-label="Sonraki"
          >
            <ArrowRight className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Kartlar carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide font-sans"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[45%] sm:w-[260px] md:w-[300px] lg:w-[320px] snap-start transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <ProductCard
              id={product.id}
              mainImage={product.mainImage}
              subImage={product.subImage}
              title={product.title}
              pricePerM2={product.pricePerM2}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>
        ))}
      </div>

      {/* Alt gösterge çubuğu */}
      <div className="absolute bottom-none md:bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
        {products.map((_, idx) => (
          <span key={idx} className="block h-1 w-8 bg-gray-300 rounded-full" />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
