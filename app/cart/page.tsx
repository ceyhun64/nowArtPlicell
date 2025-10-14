import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Cart from "@/components/cart/cart";
import Footer from "@/components/layout/footer";

export default function CartPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Cart />
      <Footer />
    </div>
  );
}
