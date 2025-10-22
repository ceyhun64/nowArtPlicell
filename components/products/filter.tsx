"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";

interface Category {
  name: string;
  count: number;
}

// Kategoriler (slug uyumlu)
const categories: Category[] = [
  { name: "tum-urunler", count: 0 },
  { name: "plicell", count: 17 },
  { name: "zebra", count: 14 },
  { name: "stor", count: 9 },
  { name: "ahsap-jaluzi", count: 9 },
];

interface FilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white w-full max-w-xs transition-all duration-300 hover:shadow-md">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-stone-800">
        <Funnel size={20} className="text-stone-700" /> Filtrele
      </h2>

      <div className="flex flex-col gap-2 font-sans">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <Button
              key={category.name}
              variant="ghost"
              size="sm"
              onClick={() => onSelectCategory(category.name)}
              className={`group w-full justify-between rounded-md border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium ${
                isSelected
                  ? "bg-[#92e676] text-green-900 hover:bg-[#7ac95c]"
                  : "text-stone-700"
              }`}
            >
              <span>{category.name.replace(/-/g, " ").toUpperCase()}</span>
              {category.count > 0 && (
                <span
                  className={`text-xs ${
                    isSelected
                      ? "text-white/80"
                      : "text-gray-500 group-hover:text-stone-700"
                  }`}
                >
                  ({category.count})
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
