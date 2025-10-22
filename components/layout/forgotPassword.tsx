"use client";

import React, { useState, FormEvent } from "react";
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

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onBackToLogin,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/account/forgot_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Bir hata oluştu, tekrar deneyin.");
      } else {
        setMessage(data.message || "Şifre sıfırlama linki gönderildi.");
      }
    } catch (err) {
      console.error("Forgot password hatası:", err);
      setMessage("Sunucu hatası, tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Şifremi Unuttum
              </DialogTitle>
              <DialogDescription className="text-gray-500 dark:text-gray-400">
                Şifrenizi almak için sistemimize kayıt olduğunuz e-posta
                adresinizi yazmanız yeterli olacaktır.
              </DialogDescription>
            </DialogHeader>

            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-4 mt-4"
              onSubmit={handleSubmit}
            >
              <Input
                type="email"
                placeholder="E-posta Adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-purple-500"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#92e676] hover:bg-green-500 text-white transition-all rounded-xl py-2 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Gönderiliyor..." : "Şifre Yenileme Linki Gönder"}
              </Button>
              {message && (
                <p
                  className={`text-center mt-2 text-sm ${
                    message.toLowerCase().includes("başarılı") ||
                    message.toLowerCase().includes("gönderildi")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </motion.form>

            <DialogFooter className="mt-4 flex justify-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  onClose(); // ForgotPasswordModal kapanır
                  onBackToLogin(); // LoginModal tekrar açılır
                }}
              >
                Giriş Ekranına Dön
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
