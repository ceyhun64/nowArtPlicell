"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  image: string;
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

  const handleSave = () => {
    onUpdate(editedBlog);
    alert("📝 Blog güncellendi (simülasyon).");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-[#001e59] hover:bg-[#92e676] text-white"
        >
          Düzenle
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-gray-900 border border-gray-300 rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Blog Düzenle
          </DialogTitle>
          <DialogDescription>
            Blog yazısının bilgilerini güncelleyin.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Input
            placeholder="Blog Başlığı"
            value={editedBlog.title}
            onChange={(e) =>
              setEditedBlog((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            placeholder="Yazar"
            value={editedBlog.author}
            onChange={(e) =>
              setEditedBlog((prev) => ({ ...prev, author: e.target.value }))
            }
          />
          <Input
            placeholder="Kategori"
            value={editedBlog.category}
            onChange={(e) =>
              setEditedBlog((prev) => ({ ...prev, category: e.target.value }))
            }
          />
          <Input
            type="date"
            value={editedBlog.date}
            onChange={(e) =>
              setEditedBlog((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <Input
            placeholder="Görsel URL"
            value={editedBlog.image}
            onChange={(e) =>
              setEditedBlog((prev) => ({ ...prev, image: e.target.value }))
            }
          />

          <Button
            onClick={handleSave}
            className="bg-[#001e59] hover:bg-[#92e676] text-white w-full mt-2"
          >
            Kaydet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
