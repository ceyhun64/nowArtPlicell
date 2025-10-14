"use client";
import React from "react";
import { Loader2 } from "lucide-react"; // shadcn/ui iconlarıyla birlikte gelir
import { cn } from "@/lib/utils"; // Eğer shadcn/ui util varsa, className birleştirmek için

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <Loader2 className="w-16 h-16 text-green-500 animate-spin" />
        {/* Loading yazısı */}
        <span className="mt-4 text-gray-700 text-lg">Loading...</span>
      </div>
    </div>
  );
}
