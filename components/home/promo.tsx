"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";

// Statik import, Next.js otomatik optimize eder
import hero21 from "@/public/heroes/21.webp";
import hero22 from "@/public/heroes/22.webp";
import hero23 from "@/public/heroes/23.webp";

interface PromoCardProps {
  image: StaticImageData;
  link: string;
  buttonText: string;
  priority?: boolean; // opsiyonel
}

const PromoCard: React.FC<PromoCardProps> = ({
  image,
  link,
  buttonText,
  priority = false,
}) => {
  return (
    <div className="relative h-[400px] md:h-[500px] w-[85%] md:w-full flex-shrink-0 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group snap-center">
      <Image
        src={image}
        alt={buttonText}
        fill
        priority={priority}
        placeholder="blur"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 transition-opacity duration-500 group-hover:from-black/50 rounded-2xl"></div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <a href={link} className="block">
          <Button
            variant="outline"
            className="px-6 py-3 text-base md:px-8 md:py-4 md:text-lg tracking-wider font-bold rounded-full transition-all duration-300 transform group-hover:scale-105 shadow-2xl"
          >
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default function PromoCards() {
  return (
    <section className="mx-auto px-4 sm:px-8 lg:px-12 py-16 bg-gray-50 font-serif">
      <div className="max-w-7xl mx-auto">
        <h2 className="hidden md:block text-4xl font-bold text-center mb-12 text-gray-800">
          Öne Çıkan Fırsatlar
        </h2>

        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide">
          <PromoCard
            image={hero22}
            link="/products"
            buttonText="NowArt Ayrıcalıktır"
            priority
          />

          <PromoCard
            image={hero23}
            link="/products"
            buttonText="Mağazaya Git"
            priority
          />

          <PromoCard
            image={hero21}
            link="/products"
            buttonText="Fırsatları Kaçırmayın"
            priority
          />
        </div>
      </div>
    </section>
  );
}
