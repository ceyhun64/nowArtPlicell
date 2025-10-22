"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  mainImage: string;
  subImage?: string;
  title: string;
  pricePerM2: number;
}

interface Favorite {
  id: number;
  productId: number;
}

interface Review {
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
    surname: string;
  };
}

export default function ProductCard({
  id,
  mainImage,
  subImage,
  title,
  pricePerM2,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  // Mevcut favori durumunu kontrol et
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) return;
        const data: Favorite[] = await res.json();
        const fav = data.find((f) => Number(f.productId) === Number(id));
        if (fav) setFavorited(true);
      } catch (err) {
        console.error(err);
      }
    };
    checkFavorite();
  }, [id]);

  // Favori ekle / sil ve Navbar ile iletişim
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (!favorited) {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        });
        if (res.ok) {
          setFavorited(true);
          // Navbar'a ekleme bilgisini gönder
          window.dispatchEvent(
            new CustomEvent("favoriteChanged", { detail: 1 })
          );
        }
      } else {
        const res = await fetch(`/api/favorites/${id}`, { method: "DELETE" });
        if (res.ok) {
          setFavorited(false);
          // Navbar'a silme bilgisini gönder
          window.dispatchEvent(
            new CustomEvent("favoriteChanged", { detail: -1 })
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // API'dan yorumları çek ve ortalama yıldızı hesapla
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/review/${id}`);
        if (!res.ok) return;
        const data: Review[] = await res.json();
        setReviews(data);

        const avg =
          data.reduce((acc, r) => acc + r.rating, 0) / (data.length || 1);
        setAverageRating(Number(avg.toFixed(1)));
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [id]);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.round(averageRating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Link href={`/products/${id}`} className="block group relative">
      <Card
        className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img
            src={hovered && subImage ? subImage : mainImage}
            alt={title}
            className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={toggleFavorite}
            className="absolute top-3 right-3 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                favorited ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <CardContent className="p-5">
          <h2 className="text-base font-semibold text-stone-800 leading-snug line-clamp-2">
            {title}
          </h2>

          <div className="mt-2 flex items-center">
            <div className="flex space-x-0.5">{renderStars()}</div>
            <span className="ml-2 text-sm text-gray-500">
              ({reviews.length})
            </span>
          </div>

          <div className="mt-3">
            <p className="text-lg font-semibold text-stone-800">
              {pricePerM2.toFixed(2)} TL
            </p>
            <p className="text-xs text-gray-500">Metrekare Fiyatı</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
