import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Measurement from "@/components/institutional/measurement";
import Footer from "@/components/layout/footer";

export default function MeasurementPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Measurement />
      <Footer />
    </div>
  );
}
