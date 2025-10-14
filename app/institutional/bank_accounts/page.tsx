import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import BankAccount from "@/components/institutional/bank_accounts";
import Footer from "@/components/layout/footer";

export default function BankAccountPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <BankAccount />
      <Footer />
    </div>
  );
}
