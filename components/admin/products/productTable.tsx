"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChangeEvent } from "react";

export interface Product {
  id: number;
  title: string;
  pricePerM2: number;
  rating: number;
  reviewCount?: number;
  mainImage: string;
  subImage?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTableProps {
  products: Product[];
  selectedIds: number[];
  onDeleteClick: (product: Product) => void;
  onUpdateClick: (product: Product) => void;
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: number) => void;
}

export default function ProductTable({
  products,
  selectedIds,
  onDeleteClick,
  onUpdateClick,
  onSelectAll,
  onSelectOne,
}: ProductTableProps) {
  const isValidImage = (image?: string) => !!image && image.trim() !== "";

  const getSafeImagePath = (image?: string) => {
    if (!isValidImage(image)) return "/placeholder.png";
    return image!.startsWith("http")
      ? image!
      : "/" + image!.replace(/^\/+/, "");
  };

  return (
    <ScrollArea className="w-full rounded-2xl border border-gray-200 bg-white shadow-md p-2">
      {/* Masaüstü Tablo */}
      <div className="hidden md:block overflow-x-auto w-full">
        <Table className="min-w-[800px] text-sm">
          <TableHeader className="bg-gray-50 text-[#001e59]">
            <TableRow>
              <TableHead className="w-10 text-center">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length > 0 &&
                    selectedIds.length === products.length
                  }
                  onChange={onSelectAll}
                  className="cursor-pointer"
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Görseller</TableHead>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Fiyat (m²)</TableHead>
              <TableHead>Puan</TableHead>
              <TableHead>Yorum</TableHead>
              <TableHead>Oluşturulma</TableHead>
              <TableHead>Güncellenme</TableHead>
              <TableHead className="text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <motion.tr
                key={product.id}
                className="hover:bg-gray-50 border-b border-gray-100 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(product.id)}
                    onChange={() => onSelectOne(product.id)}
                    className="cursor-pointer"
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden border flex-shrink-0">
                      <Image
                        src={getSafeImagePath(product.mainImage)}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-12 h-12 rounded-md overflow-hidden border flex-shrink-0">
                      <Image
                        src={getSafeImagePath(product.subImage)}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell>{product.pricePerM2.toLocaleString()} ₺</TableCell>
                <TableCell>{product.rating} ⭐</TableCell>
                <TableCell>{product.reviewCount || 0}</TableCell>
                <TableCell className="text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString("tr-TR")}
                </TableCell>
                <TableCell className="text-gray-500">
                  {new Date(product.updatedAt).toLocaleDateString("tr-TR")}
                </TableCell>
                <TableCell className="text-center flex gap-2 justify-center">
                  <Button
                    size="sm"
                    className="bg-[#92e676] hover:bg-[#001e59] text-white text-xs rounded-lg"
                    onClick={() => onUpdateClick(product)}
                  >
                    Güncelle
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#ff3b30] hover:bg-[#ff453a] text-white text-xs rounded-lg"
                    onClick={() => onDeleteClick(product)}
                  >
                    Sil
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobil Kart Görünümü */}
      <div className="md:hidden flex flex-col gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white shadow-md rounded-xl border p-4 flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex gap-3 items-center">
              <div className="relative w-20 h-20 rounded-md overflow-hidden border flex-shrink-0">
                <Image
                  src={getSafeImagePath(product.mainImage)}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="font-semibold text-[#001e59]">{product.title}</p>
                <Badge variant="outline" className="capitalize w-max">
                  {product.category}
                </Badge>
                <p className="text-[#001e59] font-semibold">
                  {product.pricePerM2.toLocaleString()} ₺ / m²
                </p>
              </div>
              <input
                type="checkbox"
                checked={selectedIds.includes(product.id)}
                onChange={() => onSelectOne(product.id)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <p>Puan: {product.rating} ⭐</p>
              <p>Yorum: {product.reviewCount || 0}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <p>
                Oluşturulma:{" "}
                {new Date(product.createdAt).toLocaleDateString("tr-TR")}
              </p>
              <p>
                Güncellenme:{" "}
                {new Date(product.updatedAt).toLocaleDateString("tr-TR")}
              </p>
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <Button
                size="sm"
                className="bg-[#92e676] hover:bg-[#001e59] text-white text-xs rounded-lg"
                onClick={() => onUpdateClick(product)}
              >
                Güncelle
              </Button>
              <Button
                size="sm"
                className="bg-[#ff3b30] hover:bg-[#ff453a] text-white text-xs rounded-lg"
                onClick={() => onDeleteClick(product)}
              >
                Sil
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}
