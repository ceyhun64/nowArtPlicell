"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ResetPasswordPageProps {
  onOpenLoginModal?: () => void; // Reset sonrası login modal açmak için
}

export default function ResetPasswordPage({
  onOpenLoginModal,
}: ResetPasswordPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/account/reset_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Bir hata oluştu");
        setIsLoading(false);
        return;
      }

      setMessage("Şifreniz başarıyla güncellendi!");

      setTimeout(() => {
        router.push("/"); // Anasayfaya yönlendir
        if (onOpenLoginModal) onOpenLoginModal(); // Login modal aç
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("Sunucu hatası, tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Şifre Sıfırlama
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Şifrenizi sıfırlamak için yeni şifrenizi girin.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Yeni Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#92e676] hover:bg-green-500 text-white rounded-xl py-2 transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Güncelleniyor..." : "Şifreyi Sıfırla"}
          </Button>

          {message && (
            <p
              className={`text-center mt-2 text-sm ${
                message.toLowerCase().includes("başarı")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-4 flex justify-center">
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/"); // anasayfaya dön
                if (onOpenLoginModal) onOpenLoginModal(); // login modal aç
              }}
            >
              Ana Ekrana Dön
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
