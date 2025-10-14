import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Measure from "@/components/info/measure";
import Footer from "@/components/layout/footer";

export default function MeasurePage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Measure />
      <Footer />
    </div>
  );
}
