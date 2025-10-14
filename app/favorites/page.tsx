import React from "react";
import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import Favorites from "@/components/favorites/favorites";
import Footer from "@/components/layout/footer";

export default function FavoritesPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Favorites />
      <Footer />
    </div>
  );
}
