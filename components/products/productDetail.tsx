"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import seedProducts from "@/seed/products.json";
import { useIsMobile } from "@/hooks/use-mobile";
import Breadcrumb from "@/components/layout/breadCrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import DescriptionandReview from "./descriptionAndReview";
import MeasureModal from "./measureModal";

interface ProductData {
  id: number;
  title: string;
  mainImage: string;
  subImage: string;
  pricePerM2: number;
  rating: number;
  reviewCount: number;
  category: string;
}

const profiles = [
  { name: "ANTRASİT", src: "/profiles/antrasit.jpg" },
  { name: "BEYAZ", src: "/profiles/beyaz.jpg" },
  { name: "BRONZ", src: "/profiles/bronz.jpg" },
  { name: "GRİ", src: "/profiles/gri.jpg" },
  { name: "KAHVE", src: "/profiles/kahve.jpg" },
  { name: "KREM", src: "/profiles/krem.jpg" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const isMobile = useIsMobile();

  const product = (seedProducts as ProductData[]).find(
    (p) => p.id === productId
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0].name);
  const [quantity, setQuantity] = useState(1);
  const [en, setEn] = useState(0);
  const [boy, setBoy] = useState(0);
  const [showMeasureModal, setShowMeasureModal] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Ürün bulunamadı.
      </div>
    );
  }

  // ✅ m² hesaplama (cm → m²)
  const calculatedM2 = useMemo(
    () => ((en * boy) / 10000).toFixed(2),
    [en, boy]
  );

  // ✅ Toplam fiyat hesaplama
  const totalPrice = useMemo(() => {
    const m2 = parseFloat(calculatedM2);
    if (isNaN(m2) || m2 <= 0) return 0;
    return (m2 * product.pricePerM2 * quantity).toFixed(2);
  }, [calculatedM2, product.pricePerM2, quantity]);

  const handleAddToCart = () =>
    toast.success(`Ürün sepete eklendi! Toplam: ₺${totalPrice}`);
  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
    toast.success(
      isFavorite ? "Favorilerden kaldırıldı." : "Favorilere eklendi!"
    );
  };
  const handleQuantityChange = (delta: number) =>
    setQuantity((prev) => Math.max(1, prev + delta));

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-10 py-12">
        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          {/* SOL - Ürün Görselleri */}
          <div
            className={`flex justify-center gap-6 ${
              isMobile ? "" : "sticky top-28 self-start"
            }`}
          >
            {/* Thumbnail List */}
            {!isMobile && (
              <div className="flex flex-col items-center gap-4 w-28">
                {[{ url: product.mainImage }, { url: product.subImage }].map(
                  (img, index) => (
                    <Card
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`overflow-hidden cursor-pointer rounded-xl transition-all duration-300 flex justify-center items-center  ${
                        activeIndex === index
                          ? "border-[#92e676] shadow-md "
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`Thumbnail ${index}`}
                        width={100}
                        height={100}
                        className="object-contain w-full h-full p-0 bg-white"
                        unoptimized
                      />
                    </Card>
                  )
                )}
              </div>
            )}

            {/* Ana Görsel */}
            <Card className="flex-1 border border-gray-200 rounded-3xl shadow-sm bg-white overflow-hidden group">
              <CardContent className="p-0 relative flex justify-center items-center">
                <Image
                  src={
                    activeIndex === 0
                      ? product.mainImage
                      : product.subImage || product.mainImage
                  }
                  alt={product.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  unoptimized
                  className="h-[600px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </CardContent>
            </Card>
          </div>

          {/* SAĞ - Bilgiler */}
          <div className="flex flex-col gap-8">
            {/* Başlık */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight ">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {product.category.toUpperCase()}
              </p>
            </div>

            <Separator />

            {/* 🎨 Renk */}
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                Renk Seçiniz
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {(seedProducts as ProductData[])
                  .filter(
                    (p) =>
                      p.category.trim().toLowerCase() ===
                      product.category.trim().toLowerCase()
                  )
                  .slice(0, 10)
                  .map((p) => {
                    const isActive = p.id === product.id;
                    return (
                      <Card
                        key={p.id}
                        onClick={() =>
                          !isActive &&
                          (window.location.href = `/products/${p.id}`)
                        }
                        className={`p-2 cursor-pointer border rounded-xl flex justify-center items-center transition-all ${
                          isActive
                            ? "border-[#001e59] shadow-md"
                            : "border-gray-200 hover:border-gray-400 hover:scale-105"
                        }`}
                      >
                        <Image
                          src={p.mainImage}
                          alt={p.title}
                          width={100}
                          height={100}
                          className="object-contain h-24 w-auto"
                          unoptimized
                        />
                      </Card>
                    );
                  })}
              </div>
            </section>

            {/* 🧩 Profil */}
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
                Profil Seçimi
              </h2>

              <div className="flex items-center space-x-4 overflow-x-auto pb-3 scrollbar-hide p-3">
                {profiles.map((profile) => {
                  const isActive = selectedProfile === profile.name;
                  return (
                    <div
                      key={profile.name}
                      onClick={() => setSelectedProfile(profile.name)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 
            ${
              isActive
                ? "ring-1 ring-[#001e59] ring-offset-2 scale-105 shadow-md"
                : "hover:ring-1 hover:ring-gray-300"
            }`}
                    >
                      <Image
                        src={profile.src}
                        alt={profile.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                      <span
                        className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-0.5 rounded-md 
              ${
                isActive
                  ? "bg-[#001e59] text-white"
                  : "bg-white/80 text-gray-700"
              }`}
                      >
                        {profile.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ⚙️ Aparat Seçimi */}
            <section>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                Aparat Seçiniz
              </h3>
              <Select defaultValue="vidali">
                <SelectTrigger className="h-12 rounded-xl border-gray-300 shadow-sm hover:border-gray-400 transition">
                  <SelectValue placeholder="Aparat Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vidali">Vidalı Sistem</SelectItem>
                  <SelectItem value="yayli">Yaylı Sistem</SelectItem>
                </SelectContent>
              </Select>
            </section>

            {/* 📏 Ölçü Alma */}
            <Button
              variant="outline"
              className="h-12 rounded-xl text-gray-800 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all"
              onClick={() => setShowMeasureModal(true)}
            >
              Ölçü Nasıl Alınır?
            </Button>

            <MeasureModal
              open={showMeasureModal}
              onClose={() => setShowMeasureModal(false)}
              onConfirm={() => toast.success("Ölçü onayı alındı.")}
            />

            {/* Ölçü Alanları */}
            <section className="bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-inner">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Ölçü Bilgileri
              </h4>
              <div className="flex justify-between gap-3">
                {[
                  { label: "EN (cm)", value: en, setValue: setEn },
                  { label: "BOY (cm)", value: boy, setValue: setBoy },
                ].map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center gap-2 flex-1"
                  >
                    <label className="text-xs font-medium text-gray-500 w-16 text-right">
                      {field.label}
                    </label>
                    <Input
                      type="number"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => field.setValue(Number(e.target.value))}
                      onFocus={(e) => {
                        if (field.value === 0) {
                          e.target.value = "";
                          field.setValue(0);
                        }
                      }}
                      className="text-center h-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#001e59]/40"
                      placeholder="0"
                    />
                  </div>
                ))}

                {/* M2 */}
                <div className="flex items-center gap-2 flex-1">
                  <label className="text-xs font-medium text-gray-500 w-8 text-right">
                    m²
                  </label>
                  <Input
                    value={`${calculatedM2}`}
                    readOnly
                    className="text-center h-10 bg-gray-100 cursor-default rounded-lg border-gray-200"
                  />
                </div>
              </div>
            </section>

            {/* 📝 Not */}
            <div>
              <label
                htmlFor="note"
                className="text-sm font-semibold text-gray-700 mb-2 block"
              >
                Not (Opsiyonel)
              </label>
              <Input
                id="note"
                type="text"
                placeholder="Örn: Cam ölçüsü, montaj notu vb."
                className="h-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#001e59]/40"
              />
            </div>

            {/* 🔢 Miktar */}
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-gray-700 w-20">
                Miktar
              </h3>
              <div className="flex items-center border rounded-xl border-gray-300">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  className="h-10 w-10 text-lg"
                >
                  –
                </Button>
                <Input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-12 text-center border-y-0 border-x h-10 text-base"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="h-10 w-10 text-lg"
                >
                  +
                </Button>
              </div>
            </div>

            {/* 🛒 Sepet & Favori */}
            <div className="flex gap-4 mt-8 items-center">
              <Button
                className="flex-1 h-12 text-base font-semibold bg-[#001e59] hover:bg-[#002d80] text-white rounded-xl transition-all shadow-md flex justify-between items-center px-6"
                onClick={handleAddToCart}
              >
                <span>SEPETE EKLE</span>
                <span className="text-sm font-normal text-gray-200">
                  ₺{totalPrice}
                </span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavoriteToggle}
                className="h-12 w-12 rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all"
              >
                <Heart
                  size={24}
                  strokeWidth={2}
                  fill={isFavorite ? "red" : "none"}
                  color={isFavorite ? "red" : "currentColor"}
                />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-14" />

        <DescriptionandReview productTitle={product.title} />
      </div>
    </div>
  );
}
