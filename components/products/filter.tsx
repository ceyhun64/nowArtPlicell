"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Funnel, ChevronDown, ChevronUp } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  subItems?: MenuItem[];
}

interface FilterProps {
  selectedCategory: string;
  selectedSubCategory: string | null;
  onSelectCategory: (cat: string, sub?: string | null) => void;
}

const productCategories: MenuItem[] = [
  {
    label: "PLICELL PERDE",
    href: "/products?category=plicell",
    subItems: [
      { label: "Bella", href: "/products?category=plicell&sub=Bella" },
      { label: "Valeria", href: "/products?category=plicell&sub=Valeria" },
      { label: "Spark", href: "/products?category=plicell&sub=Spark" },
      { label: "Merlin", href: "/products?category=plicell&sub=Merlin" },
      {
        label: "Duble Linen",
        href: "/products?category=plicell&sub=Duble%20Linen",
      },
      { label: "Elegant", href: "/products?category=plicell&sub=Elegant" },
      { label: "Dimout", href: "/products?category=plicell&sub=Dimout" },
      { label: "Blackout", href: "/products?category=plicell&sub=Blackout" },
      {
        label: "Honeycomb20",
        href: "/products?category=plicell&sub=Honeycomb20",
      },
      {
        label: "Honeycomb16",
        href: "/products?category=plicell&sub=Honeycomb16",
      },
    ],
  },
  { label: "ZEBRA PERDE", href: "/products?category=zebra" },
  { label: "STOR PERDE", href: "/products?category=stor" },
  { label: "AHŞAP JALUZİ PERDE", href: "/products?category=ahsap-jaluzi" },
];

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (label: string) => {
    if (openCategory === label) setOpenCategory(null);
    else setOpenCategory(label);
  };

  const handleCategoryClick = (item: MenuItem) => {
    const categoryKey = item.href.split("category=")[1].split("&")[0];
    onSelectCategory(categoryKey);
    if (item.subItems) toggleCategory(item.label);
  };

  const handleSubCategoryClick = (parent: MenuItem, sub: MenuItem) => {
    const categoryKey = parent.href.split("category=")[1].split("&")[0];
    const subKey = sub.href.split("sub=")[1];
    onSelectCategory(categoryKey, subKey);
  };

  return (
    <div className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white w-full max-w-xs transition-all duration-300 hover:shadow-md">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-stone-800">
        <Funnel size={20} className="text-stone-700" /> Filtrele
      </h2>

      <div className="flex flex-col gap-2 font-sans">
        {productCategories.map((category) => {
          const categoryKey = category.href.split("category=")[1].split("&")[0];
          const isSelected =
            selectedCategory === categoryKey && !selectedSubCategory;
          const isOpen = openCategory === category.label;

          return (
            <div key={category.label} className="flex flex-col gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCategoryClick(category)}
                className={`group w-full justify-between rounded-md border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium ${
                  isSelected
                    ? "bg-[#92e676] text-green-900 hover:bg-[#7ac95c]"
                    : "text-stone-700"
                }`}
              >
                <span>{category.label}</span>
                {category.subItems && (
                  <span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                )}
              </Button>

              {category.subItems && isOpen && (
                <div className="ml-4 flex flex-col gap-1 mt-1">
                  {category.subItems.map((sub) => {
                    const subKey = sub.href.split("sub=")[1];
                    const isSubSelected =
                      selectedCategory === categoryKey &&
                      selectedSubCategory === subKey;

                    return (
                      <Button
                        key={sub.label}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSubCategoryClick(category, sub)}
                        className={`w-full text-sm justify-between hover:bg-gray-100 transition-all ${
                          isSubSelected
                            ? "bg-[#92e676] text-green-900 hover:bg-[#7ac95c]"
                            : ""
                        }`}
                      >
                        <span>{sub.label}</span>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
