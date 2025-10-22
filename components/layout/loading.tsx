"use client";
import React from "react";
import { Loader } from "lucide-react";

interface LoadingProps {
  size?: number; // ikon boyutu (px)
  text?: string; // gösterilecek yazı
}

export default function Loading({
  size = 48,
  text = "Yükleniyor...",
}: LoadingProps) {
  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-80 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center animate-fadeIn">
        {/* Spinner */}
        <Loader
          className="text-green-500 animate-spin"
          style={{ width: size, height: size }}
        />
        {/* Loading yazısı */}
        <span className="mt-4 text-gray-700 text-lg font-medium">{text}</span>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
