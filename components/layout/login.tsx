"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
  onLoginSuccess?: (user: { name?: string; email?: string }) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
  onForgotPasswordClick,
  onLoginSuccess,
}: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (result?.error) {
      setLoginMessage("Email veya şifre hatalı");
      setIsSuccess(false);
      return;
    }

    if (result?.ok) {
      setLoginMessage("Giriş başarılı!");
      setIsSuccess(true);

      const loggedInUser = { email }; // İsteğe göre API'den name vs çekilebilir
      if (onLoginSuccess) onLoginSuccess(loggedInUser);

      setTimeout(() => {
        onClose(); // Modalı kapat
        router.push("/"); // İsteğe bağlı yönlendirme
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Giriş Yap
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-400">
                Hesabınıza erişmek için bilgilerinizi girin.
              </DialogDescription>
            </DialogHeader>

            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-4 mt-4"
              onSubmit={handleLogin}
            >
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifreniz"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-sm text-[#001e59] hover:underline self-end"
              >
                Şifremi Unuttum
              </button>

              <Button
                type="submit"
                className={`w-full bg-[#92e676] hover:bg-green-500 text-white py-2 rounded-xl ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>

              {loginMessage && (
                <p
                  className={`text-center mt-2 text-sm ${
                    isSuccess ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {loginMessage}
                </p>
              )}
            </motion.form>

            <DialogFooter className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-500">
                Hesabınız yok mu?{" "}
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="text-[#001e59] hover:underline"
                >
                  Kayıt Ol
                </button>
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
