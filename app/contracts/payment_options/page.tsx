import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import PaymentOptions from "@/components/contracts/paymentOptions";
import Footer from "@/components/layout/footer";

export default function PaymentOptionsPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <PaymentOptions />
      <Footer />
    </div>
  );
}
