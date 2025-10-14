import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Documents from "@/components/institutional/documents";
import Footer from "@/components/layout/footer";

export default function DocumentsPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Documents />
      <Footer />
    </div>
  );
}
