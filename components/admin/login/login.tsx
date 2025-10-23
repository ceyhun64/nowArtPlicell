"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // yükleniyor durumu
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMessage("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setLoginMessage("❌ Hatalı email veya şifre!");
      } else if (res?.ok) {
        // Kullanıcı rolünü kontrol etmek için session alıyoruz
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        if (sessionData?.user?.role !== "ADMIN") {
          setLoginMessage("❌ Bu alan sadece adminler için!");
          return;
        }

        setLoginMessage("✅ Giriş başarılı! Yönlendiriliyorsunuz...");
        setTimeout(() => router.push("/admin/dashboard"), 1000);
      } else {
        setLoginMessage("❌ Bilinmeyen bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      setLoginMessage("❌ Giriş sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-700/40 via-purple-700/30 to-transparent blur-3xl opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-xl bg-white border border-white/10 rounded-2xl shadow-2xl p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo/logo2.webp"
            alt="Logo"
            width={411}
            height={294}
            style={{ width: 80, height: "auto" }}
            className="mb-3"
          />
          <h1 className="text-4xl font-extrabold text-[#001e59] tracking-tight">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Yönetici girişi için kimlik doğrulaması yapın
          </p>
        </div>

        <Separator className="my-6 bg-white/20" />

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="text-gray-700 flex items-center gap-2"
            >
              <Mail size={16} /> E-posta
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2"
              placeholder="admin@nowart.com"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-gray-700 flex items-center gap-2"
            >
              <Lock size={16} /> Şifre
            </Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#92e676] hover:bg-green-500 text-white font-semibold py-2 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/20"
            disabled={isLoading} // yükleniyorken devre dışı bırak
          >
            {isLoading ? "Yükleniyor..." : "Giriş Yap"}
          </Button>
        </form>

        {loginMessage && (
          <p
            className={`mt-5 text-center text-sm ${
              loginMessage.includes("başarılı")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {loginMessage}
          </p>
        )}

        <p className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} NowArt Admin System
        </p>
      </motion.div>
    </div>
  );
}
