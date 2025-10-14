"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  FileText,
  User,
  ArrowUpRight, // Yeni ikon eklendi
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginModal from "./login";
import RegisterModal from "./register";

interface MenuItem {
  label: string;
  href?: string;
  subItems?: MenuItem[];
}

// Mobil menüde iç içe menü yöneticisi
const MobileNestedMenu = ({
  item,
  setIsMobileMenuOpen,
}: {
  item: MenuItem;
  setIsMobileMenuOpen: (open: boolean) => void;
}) => {
  // Eğer subItems varsa ve Mekanik Perde Sistemleri değilse DropdownMenu kullan
  // Mekanik Perde Sistemleri mobil alt barda ayrı bir Sheet olarak açılacağı için
  if (item.subItems?.length && item.label !== "Mekanik Perde Sistemleri") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center justify-between w-full text-stone-700 hover:text-[#001e59] transition-colors text-lg font-medium p-0 h-auto"
          >
            {item.label}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full bg-gray-50 p-2 space-y-1 border-none shadow-none">
          {item.subItems.map((subItem) => (
            <DropdownMenuItem
              key={subItem.label}
              className="hover:bg-gray-100 transition-colors py-2 px-3 text-base cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a href={subItem.href ?? "#"} className="block text-stone-600">
                {subItem.label}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else if (
    item.label === "Mekanik Perde Sistemleri" &&
    item.subItems?.length
  ) {
    // Mekanik Perde Sistemleri için, alt menüyü açan bir buton yapısı
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center justify-between w-full text-stone-700 hover:text-[#001e59] transition-colors text-lg font-medium p-0 h-auto"
            >
              {item.label}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-gray-50 p-2 space-y-1 border-none shadow-none">
            {item.subItems.map((subItem) => (
              <DropdownMenuItem
                key={subItem.label}
                className="hover:bg-gray-100 transition-colors py-2 px-3 text-base cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <a href={subItem.href ?? "#"} className="block text-stone-600">
                  {subItem.label}
                </a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="hover:bg-gray-100 transition-colors py-2 px-3 text-base cursor-pointer font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a
                href={item.href ?? "/products"}
                className="block text-stone-800"
              >
                Tümünü Gör
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  // Alt öğesi yoksa normal link
  return (
    <a
      href={item.href ?? "#"}
      onClick={() => setIsMobileMenuOpen(false)}
      className="text-stone-700 text-lg font-medium hover:text-[#001e59] transition-colors block py-2"
    >
      {item.label}
    </a>
  );
};

export default function Navbar(): React.ReactElement {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // Kategori menüsü için yeni durum

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Menü verileri
  const kurumsalItems: MenuItem[] = [
    { label: "Hakkımızda", href: "/institutional/about" },
    { label: "Belgelerimiz", href: "/institutional/documents" },
    { label: "Neden Bizi Tercih Etmelisiniz ?", href: "/institutional/why_us" },
    { label: "Ölçü Birimleri", href: "/institutional/measurement" },
    { label: "Banka Hesapları", href: "/institutional/bank_accounts" },
  ];

  const medyaItems: MenuItem[] = [{ label: "Videolar", href: "/media/videos" }];

  // Görseldeki Ürün Kategorileri (Artık href de içerebilir)
  const productCategories: MenuItem[] = [
    // NOT: Buradaki label'lar artık 'Products' bileşenindeki categoryNames'deki değerlerle EŞLEŞMELİ.
    { label: "DÜZ SERİ", href: "/products?category=duz-seri" }, // slug: duz-seri
    { label: "DİMOUT", href: "/products?category=dimout" }, // slug: dimout
    { label: "ÇİFT SİSTEM TÜL", href: "/products?category=cift-sistem-tul" }, // slug: cift-sistem-tul
    { label: "BLACKOUT", href: "/products?category=blackout" }, // slug: blackout
    { label: "JAKAR", href: "/products?category=jakar" }, // slug: jakar
    {
      label: "%100 KARARTMALI PERDELER",
      href: "/products?category=yuzde-yuz-karartmali",
    }, // slug: yuzde-yuz-karartmali
    {
      label: "%70 KARARTMALI PERDELER",
      href: "/products?category=yuzde-yetmis-karartmali",
    }, // slug: yuzde-yetmis-karartmali
    { label: "TEKLİ TÜL", href: "/products?category=tekli-tul" }, // slug: tekli-tul
    { label: "BASKILI", href: "/products?category=baskili" }, // slug: baskili
    { label: "HONEYCOMB", href: "/products?category=honeycomb" }, // slug: honeycomb
    { label: "PERDE AKSESUAR", href: "/products?category=aksesuar" }, // slug: aksesuar
  ];

  const mobileMenuItems: MenuItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Kurumsal", subItems: kurumsalItems },
    // Mekanik Perde Sistemleri alt öğe olarak kategorileri içerecek şekilde güncellendi
    {
      label: "Mekanik Perde Sistemleri",
      subItems: productCategories,
      href: "/products", // 'Tüm Ürünler' için genel sayfa
    },
    { label: "Blog", href: "/blog" },
    { label: "Medya", subItems: medyaItems },
    { label: "S.S.S", href: "/faq" },
    { label: "İletişim", href: "/contact" },
  ];

  const menuItemClass =
    "relative text-base font-medium text-black hover:text-stone-900 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#001e59] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <>
      <nav className="w-full bg-white shadow-md sticky top-0 z-50 font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* ===================== Mobil Görünüm ===================== */}

          <div className="flex w-full justify-between items-center lg:hidden">
            {/* Sol Grup (Menü ve Dengeleyici) */}
            <div className="flex items-center w-1/3 justify-start">
              {" "}
              {/* Sol grubu tanımladık */}
              {/* Sol Menü (Ana mobil menü) */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-stone-700 hover:bg-gray-100 transition-transform hover:scale-110"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-full sm:w-80 flex flex-col p-0"
                >
                  <SheetHeader className="p-4 border-b flex flex-row justify-between items-center">
                    <SheetTitle className="text-xl font-semibold">
                      Menü
                    </SheetTitle>
                  </SheetHeader>

                  {/* Menü İçeriği */}
                  <div className="flex-grow overflow-y-auto px-4 py-4 space-y-4">
                    {mobileMenuItems.map((item) => (
                      <MobileNestedMenu
                        key={item.label}
                        item={item}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                      />
                    ))}

                    {/* Ek Butonlar */}
                    <div className="flex flex-col space-y-2 border-t pt-4 mt-4">
                      <a
                        href="/order-tracking"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start text-base border-[#001e59] text-[#001e59] hover:bg-blue-50"
                        >
                          <FileText className="h-5 w-5 mr-2" /> Sipariş Sorgula
                        </Button>
                      </a>

                      <a
                        href="/search"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start text-base border-gray-300 text-stone-700 hover:bg-gray-100"
                        >
                          <Search className="h-5 w-5 mr-2" /> Arama
                        </Button>
                      </a>
                    </div>

                    {/* İletişim Bilgileri */}
                    <div className="pt-6 space-y-2 border-t mt-4">
                      <h3 className="font-semibold text-stone-800">
                        Yardıma ihtiyacınız var mı?
                      </h3>
                      <p className="text-sm text-stone-600 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-red-500" /> E :
                        info@modacell.com
                      </p>
                      <p className="text-sm text-stone-600 flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" /> T :
                        +90 552 555 10 25
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Orta Logo */}
            <a href="/" className="flex justify-center flex-shrink-0">
              {" "}
              {/* justify-center eklendi */}
              <img
                src="/logo/logo.jpg"
                alt="Logo"
                width={80}
                height={80}
                className="mb-3"
              />
            </a>

            {/* Sağ ikonlar */}
            <div className="flex items-center w-1/3 justify-end space-x-1 sm:space-x-2">
              {" "}
              {/* Sağ grubu tanımladık ve justify-end ile sağa yasladık */}
              <a href="/search">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 text-stone-700 transition-transform hover:scale-110"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </a>
              <a href="/favorites">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-stone-700 hover:bg-gray-100 hover:text-red-500 transition-transform hover:scale-110"
                >
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[#92e676] text-green-900 text-xs flex items-center justify-center p-0.5 leading-none">
                    0
                  </span>
                </Button>
              </a>
              {/* Sepet */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-stone-700 hover:bg-gray-100 transition-transform hover:scale-110"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[#92e676] text-green-900 text-xs flex items-center justify-center p-0.5 leading-none">
                      0
                    </span>
                  </Button>
                </SheetTrigger>

                {/* Sepet İçeriği */}
                <SheetContent
                  side="right"
                  className="w-full sm:w-96 flex flex-col justify-between p-0"
                >
                  <SheetHeader className="p-6 pb-2 border-b">
                    <SheetTitle className="text-xl font-semibold">
                      Sepetiniz (0)
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex-grow overflow-y-auto px-6 py-10 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      Sepetinizde ürün bulunmamaktadır.
                    </div>
                  </div>
                  <div className="border-t p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-base font-medium">
                        <span>Ara Toplam</span>
                        <span>0,00 TL</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Genel Toplam</span>
                        <span>0,00 TL</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="form-checkbox h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm cursor-pointer select-none"
                      >
                        <span className="hover:text-black transition-colors">
                          Şartlar ve koşulları
                        </span>{" "}
                        kabul ediyorum.
                      </label>
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1 text-black border-black hover:bg-gray-50"
                      >
                        Sepete Git
                      </Button>
                      <Button
                        variant="default"
                        className="flex-1 bg-[#001e59] text-white hover:bg-slate-800"
                      >
                        Ödemeye Geç
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {/* ===================== Masaüstü Görünüm ===================== */}
          <div className="hidden lg:flex w-full justify-between items-center h-full">
            {/* Logo */}
            <a
              href="/"
              className="text-2xl font-serif font-bold text-stone-900 tracking-wide"
            >
              <img
                src="/logo/logo.jpg"
                alt="Logo"
                width={80}
                height={80}
                className="mb-3"
              />
            </a>

            {/* Menü */}
            <div className="flex space-x-6 items-center">
              <a href="/" className={menuItemClass}>
                Anasayfa
              </a>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="text-stone-900 text-base flex items-center gap-1"
                  >
                    Kurumsal <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 shadow-lg border border-gray-200 rounded-md bg-white">
                  {kurumsalItems.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <a href={item.href ?? "#"}>{item.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="text-stone-900 text-base flex items-center gap-1"
                  >
                    Mekanik Perde Sistemleri <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 shadow-lg border border-gray-200 rounded-md bg-white">
                  {productCategories.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <a href={item.href ?? "/products"}>{item.label}</a>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="hover:bg-gray-50 transition-colors font-semibold">
                    <a href="/products">Tüm Ürünler</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a href="/blog" className={menuItemClass}>
                Blog
              </a>
              <a href="/faq" className={menuItemClass}>
                S.S.S
              </a>
              <a href="/contact" className={menuItemClass}>
                İletişim
              </a>
            </div>

            {/* Sağ İkonlar */}
            <div className="flex items-center space-x-4">
              <a href="/search">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 text-stone-700 transition-transform hover:scale-110"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </a>

              <Button
                variant="ghost"
                onClick={() => setIsLoginOpen(true)}
                className="text-stone-700 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Giriş Yap
              </Button>
              <a href="/favorites">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-stone-700 hover:bg-gray-100 hover:text-red-500 transition-transform hover:scale-110"
                >
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#92e676] text-green-900 text-xs flex items-center justify-center">
                    0
                  </span>
                </Button>
              </a>

              {/* Sepet */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-stone-700 hover:bg-gray-100 transition-transform hover:scale-110"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#92e676] text-green-900 text-xs flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </SheetTrigger>
                {/* Sepet içeriği yukarıdakiyle aynı */}
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      {/* ===================== Mobil Alt Bar ===================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner z-50">
        <div className="flex justify-around items-center h-16 max-w-screen-sm mx-auto">
          {/* Kategoriler / Kategori Menüsü (İstenen görseldeki menüyü açar) */}
          <Sheet open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center text-stone-700 hover:text-[#001e59]">
                <Menu className="h-5 w-5" />
                <span className="text-xs mt-1">Kategoriler</span>
              </button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="h-auto max-h-[80vh] w-full p-0 flex flex-col rounded-t-lg"
            >
              {/* Header */}
              <SheetHeader className="p-4 flex flex-row justify-between items-center">
                <SheetTitle>Kategoriler</SheetTitle>
              </SheetHeader>

              {/* Kategori Listesi */}
              <div className="flex-grow overflow-y-auto px-4 pb-4 space-y-1">
                {productCategories.map((item) => (
                  <a
                    key={item.label}
                    href={item.href ?? "#"}
                    onClick={() => setIsCategoriesOpen(false)}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors text-stone-800"
                  >
                    <div className="h-5 w-5 rounded-full border border-gray-300 bg-gray-50 flex-shrink-0" />
                    <span className="text-lg font-normal">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Tüm Ürünleri Listele Butonu */}
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

          {/* Arama */}
          <a
            href="/search"
            className="flex flex-col items-center justify-center text-stone-700 hover:text-[#001e59]"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Arama</span>
          </a>

          {/* Üye Girişi */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex flex-col items-center justify-center text-stone-700 hover:text-[#001e59]"
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Giriş</span>
          </button>

          {/* Sepet */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button className="relative flex flex-col items-center justify-center text-stone-700 hover:text-[#001e59]">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs mt-1">Sepet</span>
                <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-[#92e676] text-green-900 text-xs flex items-center justify-center">
                  0
                </span>
              </button>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onRegisterClick={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onLoginClick={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}
