import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import BlogDetail from "@/components/blog/blogDetail";
import Footer from "@/components/layout/footer";

export default function BlogDetailPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <BlogDetail />
      <Footer />
    </div>
  );
}
