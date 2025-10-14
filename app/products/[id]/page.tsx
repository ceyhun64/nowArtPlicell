import React from "react";
import ProductDetail from "@/components/products/productDetail";
import type { NextPage } from "next";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const ProductDetailPage: NextPage = () => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <ProductDetail />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
