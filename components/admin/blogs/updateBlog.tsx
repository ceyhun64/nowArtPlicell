"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
}

interface UpdateBlogDialogProps {
  blog: Blog;
  onUpdate: (updated: Blog) => void;
}

export default function UpdateBlogDialog({
  blog,
  onUpdate,
}: UpdateBlogDialogProps): React.ReactElement {
  const [editedBlog, setEditedBlog] = useState<Blog>(blog);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedBlog),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Güncelleme başarısız");

      onUpdate(data.blog);
        toast.success("Blog başarıyla güncellendi");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Blog güncellenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-[#001e59] hover:bg-[#92e676] text-white font-medium"
          onClick={() => setOpen(true)}
        >
          Düzenle
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-gray-900 max-w-5xl w-full border border-gray-300 rounded-2xl shadow-2xl sm:max-h-[90vh] sm:overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#001e59]">
            Blog Düzenle
          </DialogTitle>
          <DialogDescription>
            Blog yazısının bilgilerini güncelleyin.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 mt-2">
            {/* Sol sütun: Form */}
            <div className="bg-gray-50 p-2 sm:p-3 md:p-6 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 md:grid-cols-1 md:gap-4">
                {/* Başlık */}
                <div className="col-span-1 sm:col-span-2 md:col-span-full">
                  <Label className="text-xs font-semibold text-[#001e59]">
                    Başlık
                  </Label>
                  <Input
                    value={editedBlog.title}
                    onChange={(e) =>
                      setEditedBlog((prev: any) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Blog başlığı"
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
                    value={editedBlog.content}
                    onChange={(e) =>
                      setEditedBlog((prev: any) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Blog içeriği"
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
                    value={editedBlog.category}
                    onChange={(e) =>
                      setEditedBlog((prev: any) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="Kategori"
                    className="mt-1 text-sm h-8"
                    required
                  />
                </div>

                {/* Görsel URL */}
                <div className="col-span-1">
                  <Label className="text-xs font-semibold text-[#001e59]">
                    Görsel URL
                  </Label>
                  <Input
                    value={editedBlog.image}
                    onChange={(e) =>
                      setEditedBlog((prev: any) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    placeholder="Görsel bağlantısı"
                    className="mt-1 text-sm h-8"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sağ sütun: Önizleme */}
            <div className="flex flex-col gap-2 border border-gray-200 rounded-xl p-2 sm:p-3 md:p-6 bg-gray-50">
              <div className="flex flex-row justify-between items-center gap-4">
                <p className="text-sm font-semibold">
                  {editedBlog.title || "Başlık"}
                </p>
                <p className="text-gray-600 text-xs">
                  {editedBlog.category || "Kategori"}
                </p>
              </div>

              <div className="relative w-full h-40 rounded-lg overflow-hidden border border-dashed border-gray-300">
                {editedBlog.image ? (
                  <Image
                    src={editedBlog.image}
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
                  {editedBlog.content || "İçerik"}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2 flex flex-col sm:flex-col md:flex-row justify-end gap-2">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="outline"
              disabled={loading}
              className="h-8 text-sm"
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-8 text-sm bg-[#001e59] hover:bg-[#92e676] text-white"
            >
              {loading ? "Güncelleniyor..." : "Kaydet"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
