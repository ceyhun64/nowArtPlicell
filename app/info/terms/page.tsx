import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Terms from "@/components/info/termsCondition";
import Footer from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Terms />
      <Footer />
    </div>
  );
}
