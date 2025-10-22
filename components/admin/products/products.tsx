"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "@/components/admin/sideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DefaultPagination from "@/components/layout/pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductTable from "./productTable";
import { toast } from "sonner";
import AddProductDialog, { ProductFormData } from "./addProduct";
import UpdateProductDialog from "./updateProduct";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Product {
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

export default function Products(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const isMobile = useIsMobile();

  // --- API'den ürünleri fetch et ---
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (res.ok) setProducts(data.products);
      else console.error(data.error);
    } catch (err) {
      console.error("Ürünler alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Dialog kapandığında seçili ürünleri temizle
  useEffect(() => {
    if (!updateDialogOpen) setSelectedProduct(null);
    if (!deleteDialogOpen) setProductToDelete(null);
  }, [updateDialogOpen, deleteDialogOpen]);

  // Filtreleme + Arama
  const filteredProducts = products
    .filter((p) =>
      filter === "all"
        ? true
        : p.category.toLowerCase() === filter.toLowerCase()
    )
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * 15,
    currentPage * 15
  );

  // --- Ürün ekleme ---
  const handleAddProduct = async (
    formData: ProductFormData,
    mainFile: File,
    subFile?: File
  ) => {
    const dataForm = new FormData();
    dataForm.append("title", formData.title);
    dataForm.append("pricePerM2", String(formData.pricePerM2));
    dataForm.append("rating", String(formData.rating));
    dataForm.append("reviewCount", String(formData.reviewCount));
    dataForm.append("category", formData.category);
    dataForm.append("file", mainFile);
    if (subFile) dataForm.append("subImageFile", subFile);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: dataForm,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Ürün başarıyla eklendi!");
        fetchProducts();
      } else {
        toast.error(data.error || "Ürün eklenirken hata oluştu!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası oluştu!");
    }
  };

  // --- Ürün güncelleme ---
  const handleUpdateProduct = async (
    updatedData: ProductFormData,
    mainFile?: File,
    subFile?: File
  ) => {
    if (!selectedProduct) return;

    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("pricePerM2", String(updatedData.pricePerM2));
      formData.append("rating", String(updatedData.rating));
      formData.append("reviewCount", String(updatedData.reviewCount));
      formData.append("category", updatedData.category);

      if (mainFile) formData.append("file", mainFile);
      if (subFile) formData.append("subImageFile", subFile);

      const res = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Ürün başarıyla güncellendi!");
        fetchProducts();
        setUpdateDialogOpen(false);
      } else {
        toast.error(data.error || "Güncelleme başarısız");
      }
    } catch (err) {
      console.error(err);
      toast.error("Beklenmedik bir hata oluştu.");
    }
  };

  // --- Silme dialogu aç ---
  const confirmDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  // --- Seçilenleri silme dialogu ---
  const confirmDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setDeleteDialogOpen(true);
  };

  // --- Tekli ürün silme ---
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Ürün silindi!");
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      } else {
        const data = await res.json();
        toast.error(data.error || "Silme başarısız");
      }
    } catch (err) {
      console.error(err);
      toast.error("Beklenmedik bir hata oluştu.");
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // --- Seçilenleri sil ---
  const handleDeleteSelectedProducts = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/products/${id}`, { method: "DELETE" })
        )
      );
      setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      toast.success("Seçilen ürünler silindi!");
    } catch (err) {
      console.error(err);
      toast.error("Seçilen ürünler silinirken hata oluştu!");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  // --- Seçim işlemleri ---
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(paginatedProducts.map((p) => p.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex-1 p-4 md:p-8 transition-all ${
          isMobile ? "" : "md:ml-64"
        }`}
      >
        {/* Başlık */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#001e59] ms-12">
            Ürün Yönetimi
          </h1>
        </div>

        {/* Araç çubuğu */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
                selectedIds.length > 0
                  ? "bg-[#001e59] text-white hover:bg-[#002e88]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={selectedIds.length === 0}
              onClick={confirmDeleteSelected}
            >
              Seçilenleri Sil ({selectedIds.length})
            </Button>
            <AddProductDialog onSubmit={handleAddProduct} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-white border border-gray-200 text-gray-800 rounded-lg shadow-sm">
                <SelectValue placeholder="Kategori seç" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 text-gray-800 rounded-lg">
                <SelectItem value="all">Tüm Ürünler</SelectItem>
                <SelectItem value="plicell">Plicell</SelectItem>
                <SelectItem value="zebra">Zebra</SelectItem>
                <SelectItem value="stor">Stor</SelectItem>
                <SelectItem value="ahsap-jaluzi">Ahşap Jaluzi</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Ürün adına göre ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#001e59] focus:outline-none"
            />
          </div>
        </div>

        {/* Tablo */}
        <ProductTable
          products={paginatedProducts}
          onDeleteClick={confirmDeleteProduct}
          onUpdateClick={(product) => {
            setSelectedProduct(product);
            setUpdateDialogOpen(true);
          }}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          selectedIds={selectedIds}
        />

        {/* Güncelleme dialog */}
        {selectedProduct && (
          <UpdateProductDialog
            product={{
              title: selectedProduct.title,
              pricePerM2: selectedProduct.pricePerM2,
              rating: selectedProduct.rating,
              reviewCount: selectedProduct.reviewCount || 0,
              category: selectedProduct.category,
              mainImage: selectedProduct.mainImage,
              subImage: selectedProduct.subImage,
            }}
            open={updateDialogOpen}
            onOpenChange={setUpdateDialogOpen}
            onUpdate={handleUpdateProduct}
          />
        )}

        {/* Silme dialogu */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Ürünü Sil</DialogTitle>
            </DialogHeader>
            <p className="mt-2 text-sm text-gray-600">
              {productToDelete
                ? `${productToDelete.title} adlı ürünü silmek istediğinize emin misiniz?`
                : selectedIds.length > 0
                ? `${selectedIds.length} ürünü silmek istediğinize emin misiniz?`
                : "Ürün seçilmedi."}
            </p>
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                İptal
              </Button>
              <Button
                variant="destructive"
                onClick={
                  productToDelete
                    ? handleDeleteProduct
                    : handleDeleteSelectedProducts
                }
              >
                Sil
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sayfalama */}
        <div className="mt-6 flex justify-center">
          <DefaultPagination
            totalItems={filteredProducts.length}
            itemsPerPage={15}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
