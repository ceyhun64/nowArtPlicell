"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Unauthorized: React.FC = () => {
  const router = useRouter();

  const handleLoginRedirect = (): void => {
    router.push("/account/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 px-4">
      <div className="rounded-2xl bg-white shadow-xl p-8 md:p-12 max-w-md w-full text-center flex flex-col items-center">
        {/* Görsel */}
        <img
          src="/unauthorized/unauthorized.jpg"
          alt="Access Denied Illustration"
          className="w-48 h-48 md:w-64 md:h-64 mb-6 object-contain"
        />

        {/* Başlık */}
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">
          Access Denied
        </h1>

        {/* Açıklama */}
        <p className="text-stone-600 mb-8 text-sm md:text-base">
          You do not have permission to view this page. Please log in to
          continue.
        </p>

        {/* Giriş Butonu */}
        <Button
          onClick={handleLoginRedirect}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-lg transition-transform hover:scale-[1.02]"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
