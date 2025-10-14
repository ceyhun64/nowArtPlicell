import React from "react";
import type { NextPage } from "next";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Heroes from "@/components/home/heroes";
import Promo from "@/components/home/promo";
import MostPreferred from "@/components/home/mostPreffered";
import About from "@/components/home/about";
import Footer from "@/components/layout/footer";

// Arrow function + NextPage tipi
const Home: NextPage = () => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Heroes />
      <Promo />
      <MostPreferred />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
