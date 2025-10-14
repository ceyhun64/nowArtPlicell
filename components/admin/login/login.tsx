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

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy giriş kontrolü (API yok)
    if (email === "admin@nowart.com" && password === "123456") {
      setLoginMessage("✅ Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => router.push("/admin/dashboard"), 1500);
    } else {
      setLoginMessage("❌ Hatalı email veya şifre!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Arka plan efekti */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-700/40 via-purple-700/30 to-transparent blur-3xl opacity-40" />

      {/* Login kartı */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-xl bg-white border border-white/10 rounded-2xl shadow-2xl p-8"
      >
        <div className="flex flex-col items-center mb-6">
          {/* Logo */}
          <Image
            src="/logo/logo.jpg"
            alt="Logo"
            width={80}
            height={80}
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
          {/* Email */}
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

          {/* Şifre */}
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
          >
            Giriş Yap
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
