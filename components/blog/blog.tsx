"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Blog {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Plise Perde Almadan Önce Bunları Kesinlikle Bilmelisin!",
    date: "19 Şubat 2025",
    excerpt:
      "Eski perdeleriniz yer kaplamasından ve görüntüsünden sıkıldıysanız NowArt plise perde modelleri ile daha geniş alanlara sahip olabilir...",
    image: "/blog/blog1.jpg",
  },
  {
    id: 2,
    title: "Ev Dekorasyonunda Perdelerin Önemi",
    date: "10 Şubat 2025",
    excerpt:
      "Doğru perde seçimi ile yaşam alanlarınızı hem fonksiyonel hem de estetik olarak tamamlayabilirsiniz...",
    image: "/blog/blog1.jpg",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16  space-y-12">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
        Bloglar
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {mockBlogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card className="hover:shadow-xl transition-shadow cursor-pointer flex flex-col md:flex-row gap-4">
              {/* Görsel */}
              <div className="md:w-1/3">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 md:h-full object-cover rounded-xl"
                />
              </div>

              {/* İçerik */}
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
