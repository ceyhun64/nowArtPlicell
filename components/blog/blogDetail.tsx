"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Blog {
  id: number;
  title: string;
  date: string;
  content: string;
  image: string;
}

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Plise Perde Almadan Önce Bunları Kesinlikle Bilmelisin!",
    date: "19 Şubat 2025",
    content: `
Eski perdeleriniz yer kaplamasından ve görüntüsünden sıkıldıysanız NowArt plise perde modelleri ile daha geniş alanlara sahip olabilir...
    
Sürgülü Açılır Perdeler Neden Bu Kadar Rağbet Görüyor?
    
Katlamalı ve sürgülü mekanik sistemleriyle NowArt perdeler inanılmaz pratikliğiyle kullanım bakımından çok rahatlık sağlıyor...
    
Plise Perde Alacaksanız Kesin Bilmeniz Gerekenler!
    
Kafanızda bin bir türlü soru sipariş öncesi ve sonrası için başınıza gelebilecek durumlar...
`,
    image: "/blog/blog1.jpg",
  },
  {
    id: 2,
    title: "Ev Dekorasyonunda Perdelerin Önemi",
    date: "10 Şubat 2025",
    content: `
Doğru perde seçimi ile yaşam alanlarınızı hem fonksiyonel hem de estetik olarak tamamlayabilirsiniz...
    
Renk ve Malzeme Uyumu
    
Doğru malzeme seçimi, mekanın ışık alımı ve dekorasyon tarzı ile birebir uyumlu olmalıdır...
`,
    image: "/blog/blog2.jpg",
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = Number(params.id);
  const blog = mockBlogs.find((b) => b.id === blogId);

  if (!blog) return <p className="text-center mt-20">Blog bulunamadı.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
        <p className="text-gray-500">{blog.date}</p>
      </div>

      <Card className="shadow-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-t-xl"
        />
        <CardContent className="prose max-w-none text-gray-700 mt-4">
          {blog.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
