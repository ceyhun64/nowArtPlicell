"use client";

import React from "react";
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

interface AddBlogDialogProps {
  newBlog: {
    id: number;
    title: string;
    author: string;
    category: string;
    date: string;
    image: string;
  };
  setNewBlog: React.Dispatch<
    React.SetStateAction<{
      id: number;
      title: string;
      author: string;
      category: string;
      date: string;
      image: string;
    }>
  >;
  handleAddBlog: () => void;
  className?: string;
}

export default function AddBlogDialog({
  newBlog,
  setNewBlog,
  handleAddBlog,
  className,
}: AddBlogDialogProps): React.ReactElement {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`bg-[#001e59] hover:bg-[#769be6] text-white ${className}`}
        >
          Yeni Blog Ekle
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-gray-900 border border-gray-300 rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Yeni Blog Ekle
          </DialogTitle>
          <DialogDescription>
            Yeni bir blog yazısı oluşturmak için aşağıdaki alanları doldurun.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Input
            placeholder="Blog Başlığı"
            value={newBlog.title}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            placeholder="Yazar"
            value={newBlog.author}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, author: e.target.value }))
            }
          />
          <Input
            placeholder="Kategori (örn: Sanat, Dekorasyon)"
            value={newBlog.category}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, category: e.target.value }))
            }
          />
          <Input
            type="date"
            placeholder="Tarih"
            value={newBlog.date}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <Input
            placeholder="Kapak Görseli URL"
            value={newBlog.image}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, image: e.target.value }))
            }
          />

          <Button
            onClick={handleAddBlog}
            className="bg-[#001e59] hover:bg-[#92e676] text-white w-full mt-2"
          >
            Kaydet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
