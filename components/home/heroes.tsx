"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const images = [
  "/heroes/25.jpg",
  "/heroes/27.jpg",
  "/heroes/28.jpg",
  "/heroes/30.jpg",
  "/heroes/32.jpg",
  "/heroes/33.jpg",
  "/heroes/34.jpg",
  "/heroes/19.jpg",
  "/heroes/22.jpg",
  "/heroes/23.jpg",
  "/heroes/24.jpg",
];

export default function Heroes(): React.ReactElement {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
                {/* Görsel */}
                <Image
                  src={src}
                  alt={`Hero ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ borderRadius: 0 }}
                  priority={index === 0} // İlk görsel için öncelik
                  placeholder="blur" // Blur efektli placeholder
                  blurDataURL="/placeholder.jpg" // küçük bir placeholder görseli
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
