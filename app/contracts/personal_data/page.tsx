import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import PersonalData from "@/components/contracts/personalData";
import Footer from "@/components/layout/footer";

export default function PersonalDataPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <PersonalData />
      <Footer />
    </div>
  );
}
