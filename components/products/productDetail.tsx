"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { toast } from "sonner";
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
import { Card } from "@/components/ui/card";
import DescriptionandReview from "./descriptionAndReview";
import MeasureModal from "./measureModal";
import CartDropdown, { CartItemType } from "../layout/cartDropdown"; // ref ile import
import Loading from "../layout/loading";

interface ProductData {
  id: number;
  title: string;
  mainImage: string;
  subImage: string;
  pricePerM2: number;
  rating: number;
  reviewCount?: number;
  category: string;
  device?: string;
}

const profiles = [
  { name: "ANTRASİT", src: "/profiles/antrasit.jpg" },
  { name: "BEYAZ", src: "/profiles/beyaz.jpg" },
  { name: "BRONZ", src: "/profiles/bronz.jpg" },
  { name: "GRİ", src: "/profiles/gri.jpg" },
  { name: "KAHVE", src: "/profiles/kahve.jpg" },
  { name: "KREM", src: "/profiles/krem.jpg" },
  { name: "SİYAH", src: "/profiles/siyah.jpg" },
];

export default function ProductDetail() {
  const params = useParams() as { id?: string };
  const productId = Number(params.id);

  const cartDropdownRef = useRef<{ open: () => void }>(null);

  // ✅ Tüm state hook'ları en üstte
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [acceptedMeasurement, setAcceptedMeasurement] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0].name);
  const [quantity, setQuantity] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("vidali");
  const [en, setEn] = useState(0);
  const [boy, setBoy] = useState(0);
  const [note, setNote] = useState<string | null>(null);
  const [showMeasureModal, setShowMeasureModal] = useState(false);
  const [openMainImage, setOpenMainImage] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState<string | null>(
    null
  );
  const [openProfileImage, setOpenProfileImage] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<
    string | null
  >(null);
  const [categoryProducts, setCategoryProducts] = useState<ProductData[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!product) return;

    const fetchFavorite = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) return;
        const data: { productId: number }[] = await res.json();
        const fav = data.find((f) => Number(f.productId) === product.id);
        setIsFavorite(!!fav);
      } catch (err) {
        console.error("Favori durumu çekilemedi", err);
      } finally {
        setLoadingFavorite(false);
      }
    };

    fetchFavorite();
  }, [product]);

  // ✅ API'den ürünü çek
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Ürün bulunamadı");
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!product) return;

    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok && data.products) {
          // Aynı kategorideki ürünleri filtrele
          const filtered = data.products.filter(
            (p: ProductData) =>
              p.category.trim().toLowerCase() ===
              product.category.trim().toLowerCase()
          );
          setCategoryProducts(filtered);
        }
      } catch (error) {
        console.error("Kategori ürünleri çekilemedi:", error);
      }
    };

    fetchCategoryProducts();
  }, [product]);

  // ✅ m² hesaplama
  const calculatedM2 = useMemo(() => {
    const m2 = (en * boy) / 10000;
    if (isNaN(m2) || m2 <= 0) return 1;
    return m2 < 1 ? 1 : m2;
  }, [en, boy]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return calculatedM2 * product.pricePerM2 * quantity;
  }, [calculatedM2, product, quantity]);

  // ✅ Login kontrolü
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/account/check");
        if (!res.ok) return setIsLoggedIn(false);
        const data = await res.json();
        setIsLoggedIn(!!data.user?.id);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  // Sepete ekleme
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.warning("Sepete eklemek için giriş yapmalısınız."); // opsiyonel
      return;
    }

    if (!acceptedMeasurement) {
      toast.error("Lütfen ölçülerinizi onaylayın.");
      return;
    }
    if (!product) return;

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          note,
          profile: selectedProfile,
          width: en,
          height: boy,
          device: selectedDevice,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Ürün sepete eklendi! Toplam: ₺${totalPrice.toFixed(2)}`);
        cartDropdownRef.current?.open();
      } else {
        toast.error(data.error || "Sepete eklenemedi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sepete ekleme sırasında bir hata oluştu.");
    }
  };

  // Favori işlemi
  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) return;

    if (!product) return;
    try {
      if (!isFavorite) {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id }),
        });
        if (res.ok) setIsFavorite(true);
      } else {
        const res = await fetch(`/api/favorites/${product.id}`, {
          method: "DELETE",
        });
        if (res.ok) setIsFavorite(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (delta: number) =>
    setQuantity((prev) => Math.max(1, prev + delta));

  const handleProfileClick = (profileSrc: string) => {
    setSelectedProfileImage(profileSrc);
    setOpenProfileImage(true);
  };

  // ✅ Loading ve 404
  if (loading) {
    return (
    <Loading />
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Ürün bulunamadı.
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen mt-4 md:mt-8">
      <div className="container mx-auto px-4 md:px-10 ">
        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 md:mt-8">
          {/* SOL - Ürün Görselleri */}
          {/* SOL - Ürün Görselleri */}
          <div className="lg:sticky lg:top-28 lg:self-start lg:h-fit lg:flex lg:gap-6">
            {/* Masaüstü: küçük resimler solda */}
            <div className="hidden lg:flex flex-col items-center gap-4 w-28">
              {[{ url: product.mainImage }, { url: product.subImage }].map(
                (img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`overflow-hidden cursor-pointer rounded-xl transition-all duration-300 flex justify-center items-center border-2 ${
                      activeIndex === index
                        ? "border-[#92e676] shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`Thumbnail ${index}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                )
              )}
            </div>

            {/* Ana Görsel */}
            <div className="flex-1 overflow-hidden rounded-3xl shadow-sm bg-white relative">
              <Image
                src={
                  activeIndex === 0
                    ? product.mainImage
                    : product.subImage || product.mainImage
                }
                alt={product.title}
                width={500}
                height={500}
                className="object-cover w-full max-h-[500px] cursor-pointer" // ✅ cursor-pointer
                onClick={() => {
                  setSelectedMainImage(
                    activeIndex === 0
                      ? product.mainImage
                      : product.subImage || product.mainImage
                  );
                  setOpenMainImage(true);
                }}
                unoptimized
              />

              {/* Sol ve Sağ Oklar */}
              <button
                onClick={() => setActiveIndex((prev) => (prev === 0 ? 1 : 0))}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-gray-700 rounded-full p-2 shadow-md"
              >
                &#10094;
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev === 1 ? 0 : 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-gray-700 rounded-full p-2 shadow-md"
              >
                &#10095;
              </button>
            </div>
          </div>
          {openMainImage && selectedMainImage && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-100"
              onClick={() => setOpenMainImage(false)}
            >
              <div
                className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-[95%] md:max-w-[90%] lg:max-w-[1200px] w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpenMainImage(false)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md z-10"
                >
                  <X size={28} className="text-gray-700" />
                </button>
                <Image
                  src={selectedMainImage}
                  alt="Büyük Ürün Görseli"
                  width={1200}
                  height={1200}
                  className="object-contain h-full m-full"
                  unoptimized
                />
              </div>
            </div>
          )}

          {/* Mobil: küçük resimler büyük resmin altında */}
          <div className="flex flex-row justify-start gap-3 lg:hidden overflow-x-auto scrollbar-hide">
            {[{ url: product.mainImage }, { url: product.subImage }].map(
              (img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`overflow-hidden cursor-pointer rounded-xl transition-all duration-300 flex justify-center items-center border-2 ${
                    activeIndex === index
                      ? "border-[#92e676] shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${index}`}
                    width={100}
                    height={100}
                    className="object-cover "
                    unoptimized
                  />
                </div>
              )
            )}
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
            {/* 🎨 Renk */}
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                Renk
              </h2>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {categoryProducts.slice(0, 10).map((p) => {
                  const isActive = p.id === product.id;
                  return (
                    <Card
                      key={p.id}
                      onClick={() =>
                        !isActive &&
                        (window.location.href = `/products/${p.id}`)
                      }
                      className={`cursor-pointer border rounded-xl flex justify-center items-center transition-all p-1
            ${
              isActive
                ? "border-[#001e59] shadow-md"
                : "border-gray-200 hover:border-gray-400 hover:scale-105"
            }
          `}
                    >
                      <div className="w-23 h-23 md:w-36 md:h-36 flex justify-center items-center">
                        <Image
                          src={p.mainImage}
                          alt={p.title}
                          width={100}
                          height={100}
                          className="object-contain w-full h-full rounded-xl p-1.5"
                          unoptimized
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 🧩 Profil */}
            {/* 🧩 PROFİLLER */}
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
                Profiller
              </h2>
              <div className="grid grid-cols-4 gap-4 lg:flex lg:items-center lg:space-x-4 lg:overflow-x-auto lg:pb-3 lg:p-3">
                {profiles.map((profile) => {
                  const isActive = selectedProfile === profile.name;
                  return (
                    <div
                      key={profile.name}
                      onClick={() => {
                        setSelectedProfile(profile.name);
                        handleProfileClick(profile.src); // ✅ modalı aç
                      }}
                      className={`relative w-full aspect-square rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 
                    ${
                      isActive
                        ? "ring-1 ring-[#001e59] ring-offset-2 scale-105 shadow-md"
                        : "hover:ring-1 hover:ring-gray-300"
                    }
                  `}
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
                      }
                    `}
                      >
                        {profile.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 🔍 PROFİL GÖRSEL MODALI */}
            {openProfileImage && selectedProfileImage && (
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-100"
                onClick={() => setOpenProfileImage(false)} // Boş alana tıklayınca kapansın
              >
                <div
                  className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-[90%] md:max-w-xl"
                  onClick={(e) => e.stopPropagation()} // içeriğe tıklayınca kapanmasın
                >
                  <button
                    onClick={() => setOpenProfileImage(false)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                  >
                    <X size={22} className="text-gray-700" />
                  </button>
                  <Image
                    src={selectedProfileImage}
                    alt="Seçilen Profil"
                    width={500}
                    height={500}
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                </div>
              </div>
            )}
            {/* ⚙️ Aparat Seçimi */}
            <section>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                Aparat Seçiniz
              </h3>
              <Select
                value={selectedDevice}
                onValueChange={(value) => setSelectedDevice(value)}
              >
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

              {/* DEĞİŞİKLİK: EN ve BOY için ayrı bir satır (flex) oluşturduk. */}
              <div className="flex justify-between gap-3 mb-3">
                {[
                  { label: "EN (cm)", value: en, setValue: setEn },
                  { label: "BOY (cm)", value: boy, setValue: setBoy },
                ].map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center gap-2 flex-1" // flex-1 sayesinde EN ve BOY yarı yarıya yer kaplayacak
                  >
                    <label className="text-xs sm:text-sm font-medium text-gray-500 w-12 text-right">
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
                      className="text-center h-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-[#001e59]/40 w-full"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              {/* DEĞİŞİKLİK: M2 için ayrı bir satır (div) oluşturduk. */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-500 w-12 text-right">
                  m²
                </label>
                <Input
                  value={`${calculatedM2}`}
                  readOnly
                  className="text-center h-10 bg-gray-100 cursor-default rounded-lg border-gray-200 w-full"
                />
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
                value={note ?? ""}
                onChange={(e) => setNote(e.target.value)}
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
            {/* ✅ Ölçü Onayı Checkbox */}
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="measurement-confirm"
                  checked={acceptedMeasurement}
                  onCheckedChange={(checked) =>
                    setAcceptedMeasurement(Boolean(checked))
                  }
                />
                <label
                  htmlFor="measurement-confirm"
                  className="text-sm font-semibold"
                >
                  Ölçülerimi doğru aldım ve oluşabilecek hataları kabul
                  ediyorum.
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowMeasureModal(true)}
                className="text-blue-600 underline hover:text-blue-800 transition-colors text-sm ml-7 mt-1"
              >
                Ölçü Nasıl Alınır?
              </button>
            </div>

            {/* 🔗 Ölçü Nasıl Alınır linki */}
            {/* 🛒 Sepet & Favori */}
            <div className="flex gap-2 md:gap-4 mt-2 md:mt-3 items-center">
              <Button
                className="flex-1 h-12 text-base font-semibold bg-[#001e59] hover:bg-[#002d80] text-white rounded-xl transition-all shadow-md flex justify-between items-center px-6"
                onClick={handleAddToCart}
              >
                <span>SEPETE EKLE</span>
                <span className="text-md font-normal text-gray-200">
                  ₺{totalPrice}
                </span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavoriteToggle}
                className="h-12 w-12 rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all"
                disabled={loadingFavorite} // loading sırasında tıklanmasın
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

        <DescriptionandReview
          productId={product.id} // productId'yi ekledik
          productTitle={product.title}
        />
      </div>
    </div>
  );
}
