"use client";
import React from "react";
import { Loader } from "lucide-react";

interface LoadingProps {
  fullScreen?: boolean; // true ise tüm ekranı kaplar
  size?: number; // ikon boyutu (px)
  text?: string; // gösterilecek yazı
}

export default function Loading({
  fullScreen = false,
  size = 16,
  text = "Yükleniyor...",
}: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen bg-gray-50" : "h-full"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <Loader
          className={`text-green-500 animate-spin`}
          style={{ width: size * 1, height: size * 1 }}
        />
        {/* Loading yazısı */}
        <span className="mt-4 text-gray-700 text-lg">{text}</span>
      </div>
    </div>
  );
}
