"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AddBlogDialogProps {
  onAdd: (blog: any) => void;
}

export default function AddBlogDialog({ onAdd }: AddBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setImageFile(null);
  };

  const handleAddBlog = async () => {
    if (!title || !content || !category || !imageFile) {
      toast.error("Başlık, içerik, kategori ve görsel zorunludur ⚠️");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("image", imageFile);

      const res = await fetch("/api/blog", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        onAdd(data.blog);
        resetForm();
        setOpen(false);
        toast.success("Blog başarıyla eklendi!");
      } else {
        toast.error(data.message || "Blog eklenirken bir hata oluştu ⚠️");
      }
    } catch (err) {
      console.error(err);
      toast.error("Blog eklenirken bir hata oluştu ⚠️");
    } finally {
      setLoading(false);
    }
  };

  const getPreviewUrl = (file: File | null) =>
    file ? URL.createObjectURL(file) : null;

  return (
    <>
      <Button
        className="bg-[#92e676] hover:bg-[#001e59] text-white font-medium"
        onClick={() => {
          setOpen(true);
          resetForm();
        }}
      >
        Yeni Blog Ekle
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-gray-900 max-w-5xl w-full border border-gray-300 rounded-2xl shadow-2xl sm:max-h-[90vh] sm:overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#001e59]">
              Yeni Blog Ekle
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddBlog();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 mt-2">
              {/* Sol sütun: Form */}
              <div className="bg-gray-50 p-2 sm:p-3 md:p-6 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-1 md:gap-4">
                  {/* Başlık */}
                  <div className="col-span-1 sm:col-span-2 md:col-span-full">
                    <Label className="text-xs font-semibold text-[#001e59]">
                      Başlık
                    </Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Blog başlığı girin"
                      className="mt-1 text-sm h-8"
                      required
                    />
                  </div>

                  {/* İçerik */}
                  <div className="col-span-1 sm:col-span-2 md:col-span-full">
                    <Label className="text-xs font-semibold text-[#001e59]">
                      İçerik
                    </Label>
                    <textarea
                      placeholder="Blog içeriği girin"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 w-full min-h-[140px] p-2 border border-gray-300 rounded-lg resize-none text-sm"
                      required
                    />
                  </div>

                  {/* Kategori */}
                  <div className="col-span-1">
                    <Label className="text-xs font-semibold text-[#001e59]">
                      Kategori
                    </Label>
                    <Input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Kategori girin"
                      className="mt-1 text-sm h-8"
                      required
                    />
                  </div>

                  {/* Görsel Seçimi */}
                  <div className="col-span-1">
                    <Label className="text-xs font-semibold text-[#001e59]">
                      Görsel
                    </Label>
                    <label className="block mt-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                        className="hidden"
                        id="blogImageInput"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("blogImageInput")?.click()
                        }
                        className="w-full text-sm h-8"
                      >
                        {imageFile ? imageFile.name : "Görsel Seç"}
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sağ sütun: Önizleme */}
              <div className="flex flex-col gap-2 border border-gray-200 rounded-xl p-2 sm:p-3 md:p-6 bg-gray-50">
                <div className="flex flex-row justify-between items-center gap-4">
                  <p className="text-sm font-semibold">{title || "Başlık"}</p>
                  <p className="text-gray-600 text-xs">
                    {category || "Kategori seçilmedi"}
                  </p>
                </div>

                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-dashed border-gray-300">
                  {getPreviewUrl(imageFile) ? (
                    <Image
                      src={getPreviewUrl(imageFile)!}
                      alt="Blog Görseli"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      Görsel
                    </div>
                  )}
                </div>

                <div className="h-auto md:max-h-64 md:overflow-y-auto">
                  <p className="text-gray-900 mt-1 whitespace-pre-wrap text-sm line-clamp-1 md:line-clamp-none">
                    {content || "İçerik"}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-2 flex flex-col sm:flex-col md:flex-row justify-end gap-2">
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                disabled={loading}
                className="h-8 text-sm"
              >
                İptal
              </Button>
              <Button type="submit" disabled={loading} className="h-8 text-sm">
                {loading ? "Ekleniyor..." : "Blogu Ekle"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
