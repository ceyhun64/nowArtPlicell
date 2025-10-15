"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "@/components/admin/sideBar";
import AddBlogDialog from "./addBlog";
import UpdateBlogDialog from "./updateBlog";
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
import { motion } from "framer-motion";
import blogsData from "@/seed/blogs.json"; // 🧩 Örnek JSON (blogs.json)

// === Tipler ===
interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  image: string;
}

interface NewBlog {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  image: string;
}

export default function Blogs(): React.ReactElement {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newBlog, setNewBlog] = useState<NewBlog>({
    id: 0,
    title: "",
    author: "",
    category: "",
    date: "",
    image: "",
  });

  const isMobile = useIsMobile();

  // JSON verisini state'e set et
  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  // Filtreleme + Arama
  const filteredBlogs = blogs
    .filter((b) =>
      filter === "all"
        ? true
        : b.category.toLowerCase() === filter.toLowerCase()
    )
    .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * 15,
    currentPage * 15
  );

  // Yeni blog ekleme
  const handleAddBlog = () => {
    const newId = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;

    const newItem: Blog = {
      id: newId,
      title: newBlog.title,
      author: newBlog.author || "Bilinmiyor",
      category: newBlog.category || "Genel",
      date: newBlog.date || new Date().toLocaleDateString("tr-TR"),
      image: newBlog.image || "/images/sample-blog.jpg",
    };

    setBlogs((prev) => [...prev, newItem]);

    setNewBlog({
      id: 0,
      title: "",
      author: "",
      category: "",
      date: "",
      image: "",
    });

    alert("✅ Blog başarıyla eklendi (simülasyon).");
  };

  // Blog silme
  const handleDelete = (id: number) => {
    if (!confirm("Bu blog yazısını silmek istiyor musunuz?")) return;
    setBlogs(blogs.filter((b) => b.id !== id));
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  // Blog güncelleme
  const handleUpdate = (updated: Blog) => {
    setBlogs(blogs.map((b) => (b.id === updated.id ? updated : b)));
  };

  // Tümünü seç
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedBlogs.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Tek blog seç
  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Seçilenleri sil
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Seçilen ${selectedIds.length} blogu silmek istiyor musunuz?`))
      return;
    setBlogs(blogs.filter((b) => !selectedIds.includes(b.id)));
    setSelectedIds([]);
    alert("🗑️ Seçilen bloglar silindi (simülasyon).");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className={`flex-1 p-4 md:p-8 ${isMobile ? "" : "md:ml-64"}`}>
        {/* Başlık */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#001e59] ms-12">
            Blog Yönetimi
          </h1>
        </div>

        {/* Üst Araç Çubuğu */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button
              className={`w-full sm:w-auto rounded-xl shadow-sm transition-all ${
                selectedIds.length > 0
                  ? "bg-[#001e59] hover:bg-[#003080] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              Seçilenleri Sil ({selectedIds.length})
            </Button>

            <AddBlogDialog
              newBlog={newBlog}
              setNewBlog={setNewBlog}
              handleAddBlog={handleAddBlog}
              className="w-full sm:w-auto"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#001e59]/20">
                <SelectValue placeholder="Kategori seç" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-xl text-gray-900">
                <SelectItem value="all">Tüm Bloglar</SelectItem>
                <SelectItem value="Genel">Genel</SelectItem>
                <SelectItem value="Sanat">Sanat</SelectItem>
                <SelectItem value="Dekorasyon">Dekorasyon</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Blog başlığına göre ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-[#001e59]/20"
            />
          </div>
        </div>

        {/* Blog Tablosu */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-x-auto">
          <table className="min-w-full text-left text-gray-800">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length === paginatedBlogs.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                  ID
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                  Başlık
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 hidden sm:table-cell">
                  Yazar
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 hidden md:table-cell">
                  Kategori
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 hidden lg:table-cell">
                  Tarih
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-center">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBlogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Blog bulunamadı.
                  </td>
                </tr>
              ) : (
                paginatedBlogs.map((blog) => (
                  <motion.tr
                    key={blog.id}
                    className="hover:bg-gray-50 transition-all duration-150"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(blog.id)}
                        onChange={() => handleSelectOne(blog.id)}
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                      {blog.id}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 font-medium text-gray-900">
                      {blog.title}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-gray-700 hidden sm:table-cell">
                      {blog.author}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-gray-700 hidden md:table-cell">
                      {blog.category}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-gray-500 hidden lg:table-cell">
                      {blog.date}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 text-center">
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <UpdateBlogDialog blog={blog} onUpdate={handleUpdate} />
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleDelete(blog.id)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm"
                        >
                          Sil
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Sayfalama */}
        <div className="mt-6 flex justify-center">
          <DefaultPagination
            totalItems={filteredBlogs.length}
            itemsPerPage={15}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}
