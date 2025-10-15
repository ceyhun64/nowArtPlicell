"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Görselleri import ederek Next.js optimizer kullanıyoruz
import hero25 from "@/public/heroes/25.jpg";
import hero27 from "@/public/heroes/27.jpg";
import hero28 from "@/public/heroes/28.jpg";
import hero30 from "@/public/heroes/30.jpg";
import hero32 from "@/public/heroes/32.jpg";
import hero33 from "@/public/heroes/33.jpg";
import hero34 from "@/public/heroes/34.jpg";
import hero19 from "@/public/heroes/19.jpg";
import hero22 from "@/public/heroes/22.jpg";
import hero23 from "@/public/heroes/23.jpg";
import hero24 from "@/public/heroes/24.jpg";

const images = [
  hero25,
  hero27,
  hero28,
  hero30,
  hero32,
  hero33,
  hero34,
  hero19,
  hero22,
  hero23,
  hero24,
];

export default function Heroes(): React.ReactElement {
  const [current, setCurrent] = useState(0);

  // Otomatik slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Sonraki görseli preload et (TypeScript uyumlu)
  useEffect(() => {
    const nextIndex = (current + 1) % images.length;
    const img = new window.Image();
    img.src = images[nextIndex].src;
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const mobileHeight = "h-[250px]";
  const desktopHeight = "md:h-[700px]";

  return (
    <div className="bg-gray-50 pt-0 md:pt-8">
      <section
        className={`relative ${mobileHeight} ${desktopHeight} w-full max-w-[1400px] mx-auto overflow-hidden rounded-none md:rounded-4xl`}
      >
        {/* Slider container */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${current * (100 / images.length)}%)`,
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="relative w-[100%] flex-shrink-0 h-full shadow-lg"
              style={{ width: `${100 / images.length}%` }}
            >
              <Link
                href="/products"
                className="block h-full w-full group cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Hero ${index + 1}`}
                  width={1400}
                  height={600}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0} // İlk görsel öncelikli
                  placeholder="blur" // Blur efekti
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </Link>
            </div>
          ))}
        </div>

        {/* Sol Ok */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 
             bg-white bg-opacity-60 hover:bg-opacity-90 text-gray-800 
             rounded-full p-2 md:p-3 shadow-lg transition z-20 
             scale-90 md:scale-100"
        >
          <ChevronLeft size={20} className="md:hidden" />
          <ChevronLeft size={28} className="hidden md:block" />
        </button>

        {/* Sağ Ok */}
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 
             bg-white bg-opacity-60 hover:bg-opacity-90 text-gray-800 
             rounded-full p-2 md:p-3 shadow-lg transition z-20 
             scale-90 md:scale-100"
        >
          <ChevronRight size={20} className="md:hidden" />
          <ChevronRight size={28} className="hidden md:block" />
        </button>

        {/* Nokta göstergeleri */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all ${
                idx === current ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
