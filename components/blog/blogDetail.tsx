"use client";

import React from "react";
import { useSearchParams } from "next/navigation"; // Next.js hook
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Blog {
  id: number;
  title: string;
  date: string;
  content: string;
  image: string;
}

export default function BlogDetailPage() {
  const searchParams = useSearchParams();

  // searchParams null olabileceği için güvenli kontrol
  const blogParam = searchParams?.get("blog") ?? null;
  
  let blog: Blog | null = null;
  if (blogParam) {
    try {
      blog = JSON.parse(blogParam);
    } catch (err) {
      console.error("Blog param parse edilemedi:", err);
      blog = null;
    }
  }

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
          className="w-full h-64 md:h-128 object-cover rounded-t-xl"
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
