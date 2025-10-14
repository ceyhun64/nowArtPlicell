import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Addresses from "@/components/profile/addresses";
import Footer from "@/components/layout/footer";

export default function AddressesPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Addresses />
      <Footer />
    </div>
  );
}
