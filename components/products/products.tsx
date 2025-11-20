// "use client" directive remains for client-side hooks
"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./productCard";
import Filter from "./filter";
import {
  Columns2,
  Columns3,
  Columns4,
  ListFilter,
  StretchHorizontal,
  StretchVertical,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
import Loading from "../layout/loading";

interface ProductData {
  id: number;
  title: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  subImage: string;
  category: string;
  subCategory?: string;
}

// Kategori isimleri
const categoryNames: Record<string, string> = {
  "tum-urunler": "TÜM ÜRÜNLER",
  plicell: "PLİCELL",
  zebra: "ZEBRA",
  stor: "STOR",
  "ahsap-jaluzi": "AHŞAP JALUZİ",
};

interface MenuItem {
  label: string;
  href: string;
  subItems?: MenuItem[];
}

const productCategories: MenuItem[] = [
  {
    label: "PLICELL PERDE",
    href: "/products?category=plicell",
    subItems: [
      { label: "Bella", href: "/products?category=plicell&sub=Bella" },
      { label: "Valeria", href: "/products?category=plicell&sub=Valeria" },
      { label: "Spark", href: "/products?category=plicell&sub=Spark" },
      { label: "Merlin", href: "/products?category=plicell&sub=Merlin" },
      {
        label: "Duble Linen",
        href: "/products?category=plicell&sub=Duble%20Linen",
      },
      { label: "Elegant", href: "/products?category=plicell&sub=Elegant" },
      { label: "Dimout", href: "/products?category=plicell&sub=Dimout" },
      { label: "Blackout", href: "/products?category=plicell&sub=Blackout" },
      {
        label: "Honeycomb20",
        href: "/products?category=plicell&sub=Honeycomb20",
      },
      {
        label: "Honeycomb16",
        href: "/products?category=plicell&sub=Honeycomb16",
      },
    ],
  },
  { label: "ZEBRA PERDE", href: "/products?category=zebra" },
  { label: "STOR PERDE", href: "/products?category=stor" },
  { label: "AHŞAP JALUZİ PERDE", href: "/products?category=ahsap-jaluzi" },
];
const ProductsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromUrl = searchParams?.get("category") || null;
  const subFromUrl = searchParams?.get("sub") || null;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [mobileGridCols, setMobileGridCols] = useState<1 | 2>(2);
  const [sort, setSort] = useState<"az" | "za" | "priceLow" | "priceHigh">(
    "az"
  );
  const [selectedCategory, setSelectedCategory] = useState("tum-urunler");
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Ürünler API'den çekilemedi");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // URL’den kategori ve subCategory normalizasyonu
  useEffect(() => {
    const normalize = (value: string | null) =>
      value ? value.toLowerCase().replace(/\s+/g, "-") : null;

    const normalizedCategory = normalize(categoryFromUrl) || "tum-urunler";
    const normalizedSub = normalize(subFromUrl);

    setSelectedCategory(normalizedCategory);
    setSelectedSub(normalizedSub);
    setIsReady(true);
  }, [categoryFromUrl, subFromUrl]);

  const handleGridChange = (cols: 2 | 3 | 4) => setGridCols(cols);

  const handleSelectCategory = (category: string, sub?: string | null) => {
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, "-");
    const normalizedSub = sub ? sub.toLowerCase().replace(/\s+/g, "-") : null;

    setSelectedCategory(normalizedCategory);
    setSelectedSub(normalizedSub);
    setIsCategoriesOpen(false);

    if (normalizedCategory === "tum-urunler") router.push("/products");
    else if (normalizedSub)
      router.push(
        `/products?category=${normalizedCategory}&sub=${normalizedSub}`
      );
    else router.push(`/products?category=${normalizedCategory}`);
  };

  const filteredProducts = useMemo(() => {
    if (isLoading || !isReady) return [];

    if (selectedCategory === "tum-urunler") return products;

    return products.filter((p) => {
      const catMatch =
        p.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory;
      const subMatch = selectedSub
        ? p.subCategory?.toLowerCase().replace(/\s+/g, "-") === selectedSub
        : true;
      return catMatch && subMatch;
    });
  }, [products, selectedCategory, selectedSub, isReady, isLoading]);

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

  if (isLoading || !isReady) return <Loading />;

  // ... (Geri kalan render mantığı aynı kalır)
  return (
    <div className="flex flex-col md:flex-row md:space-x-8 px-4 md:px-20 py-8 bg-gray-50 font-serif mx-auto">
      {/* Sol Filtre (Desktop) */}
      <aside className="hidden md:block md:w-1/4 mb-6 md:mb-0">
        <div className="sticky top-28">
          <Filter
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSub}
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
                    {productCategories.map((cat) => {
                      const categoryKey =
                        cat.href?.split("category=")[1]?.split("&")[0] || "";
                      const isOpen = openSubMenus[cat.label] || false;

                      return (
                        <div key={cat.label} className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (cat.subItems?.length) {
                                setOpenSubMenus((prev) => ({
                                  ...prev,
                                  [cat.label]: !prev[cat.label],
                                }));
                              } else {
                                // Alt kategori yoksa direkt sayfaya git
                                window.location.href = cat.href ?? "/products";
                                setIsCategoriesOpen(false);
                              }
                            }}
                            className="group w-full justify-between rounded-md border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium text-stone-700"
                          >
                            <span>{cat.label}</span>
                            {cat.subItems?.length && (
                              <span>
                                {isOpen ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronUp className="w-4 h-4" />
                                )}
                              </span>
                            )}
                          </Button>

                          {/* Alt kategoriler */}
                          {cat.subItems?.length && isOpen && (
                            <div className="ml-4 flex flex-col gap-1 mt-1">
                              {cat.subItems.map((sub) => (
                                <Button
                                  key={sub.label}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    window.location.href =
                                      sub.href ?? "/products";
                                    setIsCategoriesOpen(false);
                                  }}
                                  className="w-full text-sm justify-between hover:bg-gray-100 transition-all"
                                >
                                  <span>{sub.label}</span>
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
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
                : "sm:grid-cols-4"
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

const Products: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <ProductsContent />
  </Suspense>
);

export default Products;
