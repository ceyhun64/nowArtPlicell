import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import DistanceSale from "@/components/contracts/distanceSale";
import Footer from "@/components/layout/footer";

export default function DİstanceSalePage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <DistanceSale />
      <Footer />
    </div>
  );
}
