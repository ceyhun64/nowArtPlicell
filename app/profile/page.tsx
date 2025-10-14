import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import MyPersonalInformation from "@/components/profile/myPersonalInformation";
import Footer from "@/components/layout/footer";

export default function MyPersonalInformationPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <MyPersonalInformation />
      <Footer />
    </div>
  );
}
