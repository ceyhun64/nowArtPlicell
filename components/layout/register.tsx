"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void; // Login modalını açmak için
}

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
}: RegisterModalProps) {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
  const [registerMessage, setRegisterMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          marketingConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRegisterMessage(data.error || "Kayıt başarısız!");
        setIsSuccess(false);
        setIsLoading(false);
        return;
      }

      setRegisterMessage("Kayıt başarılı! Giriş yapın.");
      setIsSuccess(true);
      setIsLoading(false);

      onLoginClick();
      onClose(); // kayıt modalını kapat
    } catch (err) {
      console.error(err);
      setRegisterMessage("Sunucu hatası, tekrar deneyin.");
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Kayıt Ol</DialogTitle>
          <DialogDescription className="mt-2 text-gray-500">
            Hesap oluşturmak için bilgilerinizi girin.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 mt-6" onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Ad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            required
          />
          <Input
            type="text"
            placeholder="Soyad"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full"
            required
          />
          <Input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
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

          <Button
            type="submit"
            className={`w-full bg-[#92e676] hover:bg-green-500 text-white py-2 rounded-xl ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </Button>

          {registerMessage && (
            <p
              className={`text-sm text-center mt-2 ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {registerMessage}
            </p>
          )}
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Zaten hesabınız var mı?{" "}
          <button
            type="button"
            className="text-[#001e59] font-medium hover:underline"
            onClick={() => {
              onLoginClick();
              onClose();
            }}
          >
            Giriş Yap
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
