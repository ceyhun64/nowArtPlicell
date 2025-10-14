import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import About from "@/components/institutional/about";
import Footer from "@/components/layout/footer";

export default function AboutPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <About />
      <Footer />
    </div>
  );
}
