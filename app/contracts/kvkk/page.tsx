import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Kvkk from "@/components/contracts/kvkk";
import Footer from "@/components/layout/footer";

export default function KvkkPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Kvkk />
      <Footer />
    </div>
  );
}
