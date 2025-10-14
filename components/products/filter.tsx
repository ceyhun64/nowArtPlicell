"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Funnel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Tipler
interface SubCategory {
  name: string;
  count: number;
}

interface Category {
  name: string;
  count: number;
  subcategories: SubCategory[];
}

// Kategoriler (slug uyumlu)
const categories: Category[] = [
  { name: "tum-urunler", count: 0, subcategories: [] },
  { name: "duz-seri", count: 17, subcategories: [] },
  { name: "baskili", count: 14, subcategories: [] },
  { name: "cift-sistem-tul", count: 9, subcategories: [] },
  { name: "tekli-tul", count: 9, subcategories: [] },
  { name: "jakar", count: 56, subcategories: [] },
  { name: "honeycomb", count: 6, subcategories: [] },
  {
    name: "100-karartmali-perdeler",
    count: 0,
    subcategories: [{ name: "blackout", count: 5 }],
  },
  {
    name: "70-karartmali-perdeler",
    count: 0,
    subcategories: [{ name: "dimout", count: 5 }],
  },
  { name: "perde-aksesuar", count: 0, subcategories: [] },
];

interface FilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string, sub?: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (name: string) => {
    setOpenCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  return (
    <div className=" p-6 border border-gray-100 rounded-2xl shadow-sm bg-white w-full max-w-xs transition-all duration-300 hover:shadow-md">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-stone-800">
        <Funnel size={20} className="text-stone-700" /> Filtrele
      </h2>

      <div className="flex flex-col gap-2 font-sans">
        {categories.map((category) => {
          const hasSub = category.subcategories.length > 0;
          const isOpen = openCategories.includes(category.name);
          const isSelected = selectedCategory === category.name;

          return (
            <div key={category.name} className="flex flex-col">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  hasSub
                    ? toggleCategory(category.name)
                    : onSelectCategory(category.name)
                }
                className={`group w-full justify-between rounded-md border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium ${
                  isSelected
                    ? "bg-[#92e676] text-green-900 hover:bg-[#7ac95c]"
                    : "text-stone-700"
                }`}
              >
                <span>{category.name.replace(/-/g, " ").toUpperCase()}</span>
                <div className="flex items-center gap-1">
                  {category.count > 0 && !hasSub && (
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
                  {hasSub && (
                    <span className="transition-transform">
                      {isOpen ? (
                        <ChevronUp size={14} className="opacity-70" />
                      ) : (
                        <ChevronDown size={14} className="opacity-70" />
                      )}
                    </span>
                  )}
                </div>
              </Button>

              <AnimatePresence>
                {hasSub && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-3 mt-2 flex flex-col gap-2 overflow-hidden"
                  >
                    {category.subcategories.map((sub) => {
                      const subSelected = selectedCategory === sub.name;
                      return (
                        <Button
                          key={sub.name}
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            onSelectCategory(category.name, sub.name)
                          }
                          className={`w-full justify-between rounded-md text-sm font-normal transition-all ${
                            subSelected
                              ? "bg-[#92e676] text-white hover:bg-[#7ac95c]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-stone-700"
                          }`}
                        >
                          <span>
                            {sub.name.replace(/-/g, " ").toUpperCase()}
                          </span>
                          {sub.count > 0 && (
                            <span
                              className={`text-xs ${
                                subSelected ? "text-white/80" : "text-gray-500"
                              }`}
                            >
                              ({sub.count})
                            </span>
                          )}
                        </Button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
