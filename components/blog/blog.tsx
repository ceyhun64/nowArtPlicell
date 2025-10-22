"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Loading from "../layout/loading";

interface Blog {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Bloglar alınamadı");
      const data = await res.json();
      // excerpt oluştur
      const blogsWithExcerpt = data.blogs.map((b: any) => ({
        ...b,
        excerpt: b.content.slice(0, 120) + "...",
      }));
      setBlogs(blogsWithExcerpt);
    } catch (err: any) {
      toast.error(err.message || "Bloglar alınamadı");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <Loading />;
  if (blogs.length === 0)
    return <p className="text-center mt-20">Henüz blog bulunmamaktadır.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
        Bloglar
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={{
              pathname: `/blog/${blog.id}`,
              query: { blog: JSON.stringify(blog) }, // blog objesini search param olarak gönderiyoruz
            }}
          >
            <Card className="hover:shadow-xl transition-shadow cursor-pointer flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 md:h-full object-cover rounded-xl"
                />
              </div>

              <div className="md:w-2/3 p-4 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-2">{blog.date}</p>
                  <p className="text-gray-700 text-sm">{blog.excerpt}</p>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
