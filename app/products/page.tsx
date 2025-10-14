// page.tsx
import Products from "@/components/products/products";
import Navbar from "@/components/layout/navbar";
import Topbar from "@/components/layout/topbar";
import Footer from "@/components/layout/footer";

export default function ProductsPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Products /> {/* Products: "use client" */}
      <Footer />
    </div>
  );
}
