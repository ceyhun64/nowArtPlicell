// "use client" directive remains for client-side hooks
"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
// useSearchParams ve useRouter burada kalır.
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./productCard";
import Filter from "./filter";
import {
  Columns2,
  Columns3,
  Columns4,
  ArrowUpRight,
  ListFilter,
  StretchHorizontal,
  StretchVertical,
} from "lucide-react";
// seedProducts'ın doğru yoldan import edildiğini varsayıyoruz.
import seedProducts from "@/seed/products.json";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

interface ProductData {
  id: number;
  title: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  subImage: string;
  category: string;
  subcategory?: string;
}

// === Kategori İsimleri ===
const categoryNames: Record<string, string> = {
  "tum-urunler": "TÜM ÜRÜNLER",
  "duz-seri": "DÜZ SERİ",
  baskili: "BASKILI",
  "cift-sistem-tul": "ÇİFT SİSTEM TÜL",
  "tekli-tul": "TEKLİ TÜL",
  jakar: "JAKAR",
  honeycomb: "HONEYCOMB",
  blackout: "BLACKOUT",
  dimout: "DIMOUT",
  "yuzde-yuz-karartmali": "%100 KARARTMALI PERDELER",
  "yuzde-yetmis-karartmali": "%70 KARARTMALI PERDELER",
  aksesuar: "PERDE AKSESUAR",
};

// Orijinal mantığı içeren ana bileşen. Artık doğrudan dışa aktarılmıyor.
// Bu bileşen, istemci tarafı hook'ları içerir.
const ProductsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromUrl = searchParams.get("category");
  const subFromUrl = searchParams.get("sub");

  // === State ===
  const [gridCols, setGridCols] = useState<1 | 2 | 3 | 4>(3);
  const [mobileGridCols, setMobileGridCols] = useState<1 | 2>(2);
  const [sort, setSort] = useState<"az" | "za" | "priceLow" | "priceHigh">(
    "az"
  );
  const [selectedCategory, setSelectedCategory] =
    useState<string>("tum-urunler");
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // === Kategori & Sub Normalizasyonu ===
  useEffect(() => {
    const normalize = (value: string | null) =>
      value ? value.toLowerCase().replace(/\s+/g, "-") : null;

    const normalizedCategory = normalize(categoryFromUrl) || "tum-urunler";
    const normalizedSub = normalize(subFromUrl);

    setSelectedCategory(normalizedCategory);
    setSelectedSub(normalizedSub);
    setIsReady(true);
  }, [categoryFromUrl, subFromUrl]);

  // === Grid Değiştirici ===
  const handleGridChange = (cols: 1 | 2 | 3 | 4) => setGridCols(cols);

  // === Kategori Seçimi ===
  const handleSelectCategory = (category: string, sub?: string | null) => {
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, "-");
    const normalizedSub = sub ? sub.toLowerCase().replace(/\s+/g, "-") : null;

    setSelectedCategory(normalizedCategory);
    setSelectedSub(normalizedSub);
    setIsCategoriesOpen(false);

    if (normalizedCategory === "tum-urunler") {
      router.push("/products");
    } else if (normalizedSub) {
      router.push(
        `/products?category=${normalizedCategory}&sub=${normalizedSub}`
      );
    } else {
      router.push(`/products?category=${normalizedCategory}`);
    }
  };

  // === Filtrelenmiş Ürünler ===
  const filteredProducts = useMemo(() => {
    if (!isReady) return [];

    if (selectedCategory === "tum-urunler") return seedProducts;

    return (seedProducts as ProductData[]).filter((p: ProductData) => {
      const categoryMatch =
        p.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory;
      const subMatch = selectedSub
        ? p.subcategory?.toLowerCase().replace(/\s+/g, "-") === selectedSub
        : true;
      return categoryMatch && subMatch;
    });
  }, [selectedCategory, selectedSub, isReady]);

  // === Sıralama ===
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sort) {
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "priceLow":
        sorted.sort((a, b) => a.pricePerM2 - b.pricePerM2);
        break;
      case "priceHigh":
        sorted.sort((a, b) => b.pricePerM2 - a.pricePerM2);
        break;
    }
    return sorted;
  }, [filteredProducts, sort]);

  if (!isReady) {
    // Bu yükleme durumunu Suspense'in fallback'ine taşıdık,
    // ancak `isReady` state'i hala gerekli olabilir.
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Ürünler yükleniyor...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:space-x-8 px-4 md:px-20 py-8 bg-gray-50 font-serif mx-auto">
      {/* Sol Filtre (Desktop) */}
      <aside className="hidden md:block md:w-1/4 mb-6 md:mb-0">
        <div className="sticky top-28">
          <Filter
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </aside>

      {/* Ürün Alanı */}
      <main className="flex-1">
        {/* Üst Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Başlık */}
          <h2 className="text-2xl font-semibold text-stone-800">
            {selectedSub
              ? selectedSub.replace(/-/g, " ").toUpperCase()
              : selectedCategory === "tum-urunler"
              ? "TÜM ÜRÜNLER"
              : categoryNames[selectedCategory] ||
                selectedCategory.toUpperCase()}
          </h2>

          {/* Kontroller */}
          <div className="flex items-center gap-3">
            {/* Mobil Kontroller */}
            <div className="flex md:hidden items-center gap-3">
              {/* Kategoriler Butonu */}
              <Sheet open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
                <SheetTrigger asChild>
                  <Button className="w-30 bg-white border text-black border-gray-200 rounded-xl shadow-sm flex items-center gap-2">
                    <ListFilter className="h-5 w-5" />
                    Kategoriler
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="bottom"
                  className="h-auto max-h-[80vh] w-full p-0 flex flex-col rounded-t-lg"
                >
                  <SheetHeader className="p-4 flex flex-row justify-between items-center">
                    <SheetTitle>Kategoriler</SheetTitle>
                  </SheetHeader>

                  <div className="flex-grow overflow-y-auto px-4 pb-4 space-y-1">
                    {Object.keys(categoryNames).map((key) => (
                      <div
                        key={key}
                        onClick={() => handleSelectCategory(key)}
                        className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors text-stone-800"
                      >
                        <div className="h-5 w-5 rounded-full border border-gray-300 bg-gray-50 flex-shrink-0" />
                        <span className="text-lg font-normal">
                          {categoryNames[key]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t">
                    <a
                      href="/products"
                      onClick={() => setIsCategoriesOpen(false)}
                      className="flex items-center justify-start w-full text-base font-medium text-stone-800 hover:text-[#001e59] transition-colors"
                    >
                      Tüm Ürünleri Listele
                      <ArrowUpRight className="h-5 w-5 ml-2" />
                    </a>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobil Grid Toggle */}
              <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden md:hidden">
                <button
                  onClick={() =>
                    setMobileGridCols(mobileGridCols === 1 ? 2 : 1)
                  }
                  title={
                    mobileGridCols === 1
                      ? "2'li görünümü göster"
                      : "1'li görünümü göster"
                  }
                  className={cn(
                    "p-2.5 transition-all flex items-center justify-center rounded-xl",
                    mobileGridCols === 1
                      ? "bg-gray-50 text-stone-800 shadow-sm hover:bg-gray-100"
                      : "bg-gray-100 text-stone-800 shadow-inner hover:bg-gray-200"
                  )}
                >
                  {mobileGridCols === 1 ? (
                    <StretchHorizontal size={18} />
                  ) : (
                    <StretchVertical size={18} />
                  )}
                </button>
              </div>

              {/* Sıralama */}
              <Select
                value={sort}
                onValueChange={(value) => setSort(value as typeof sort)}
              >
                <SelectTrigger className="w-40 bg-white border border-gray-200 rounded-xl shadow-sm text-xs">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="az">Alfabetik A-Z</SelectItem>
                  <SelectItem value="za">Alfabetik Z-A</SelectItem>
                  <SelectItem value="priceLow">
                    Fiyat: Düşükten Yükseğe
                  </SelectItem>
                  <SelectItem value="priceHigh">
                    Fiyat: Yüksekten Düşüğe
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Masaüstü Kontroller */}
            <div className="hidden md:flex items-center gap-3">
              {/* Grid Seçici */}
              <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {[2, 3, 4].map((cols) => (
                  <button
                    key={cols}
                    onClick={() => handleGridChange(cols as 2 | 3 | 4)}
                    className={cn(
                      "p-2.5 transition-all",
                      gridCols === cols
                        ? "bg-gray-100 text-stone-800"
                        : "text-gray-500 hover:text-stone-800"
                    )}
                  >
                    {cols === 2 ? (
                      <Columns2 size={18} />
                    ) : cols === 3 ? (
                      <Columns3 size={18} />
                    ) : (
                      <Columns4 size={18} />
                    )}
                  </button>
                ))}
              </div>

              {/* Sıralama */}
              <Select
                value={sort}
                onValueChange={(value) => setSort(value as typeof sort)}
              >
                <SelectTrigger className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="az">Alfabetik A-Z</SelectItem>
                  <SelectItem value="za">Alfabetik Z-A</SelectItem>
                  <SelectItem value="priceLow">
                    Fiyat: Düşükten Yükseğe
                  </SelectItem>
                  <SelectItem value="priceHigh">
                    Fiyat: Yüksekten Düşüğe
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Ürün Grid */}
        {sortedProducts.length > 0 ? (
          <div
            className={cn(
              "grid gap-6 font-sans",
              mobileGridCols === 1 ? "grid-cols-1" : "grid-cols-2",
              gridCols === 2
                ? "sm:grid-cols-2"
                : gridCols === 3
                ? "sm:grid-cols-3"
                : gridCols === 4
                ? "sm:grid-cols-4"
                : "sm:grid-cols-3"
            )}
          >
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500 text-lg bg-white rounded-2xl border border-gray-100 shadow-sm">
            Bu kategoride ürün bulunamadı.
          </div>
        )}
      </main>
    </div>
  );
};

// Bu bileşen, sayfanızda (örneğin app/products/page.tsx) import etmeniz gereken yeni varsayılan dışa aktarımdır.
// ProductsContent bileşenini <Suspense> içinde sarmalayarak Vercel/Next.js hatasını çözer.
const Products: React.FC = () => {
  // Suspense için basit bir yüklenme göstergesi (fallback)
  const loadingFallback = (
    <div className="flex justify-center items-center py-20 text-gray-500">
      Sayfa yükleniyor...
    </div>
  );

  return (
    <Suspense fallback={loadingFallback}>
      <ProductsContent />
    </Suspense>
  );
};

export default Products;
