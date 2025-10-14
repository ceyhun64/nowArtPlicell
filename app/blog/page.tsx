import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Blog from "@/components/blog/blog";
import Footer from "@/components/layout/footer";

export default function BlogPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Blog />
      <Footer />
    </div>
  );
}
