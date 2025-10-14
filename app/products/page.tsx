import React from "react";
import type { NextPage } from "next";
import Products from "@/components/products/products";
import Navbar from "@/components/layout/navbar";
import Topbar from "@/components/layout/topbar";
import Footer from "@/components/layout/footer";

const ProductsPage: NextPage = () => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
};

export default ProductsPage;
