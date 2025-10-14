import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Orders from "@/components/profile/orders";
import Footer from "@/components/layout/footer";

export default function OrdersPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Orders />
      <Footer />
    </div>
  );
}
