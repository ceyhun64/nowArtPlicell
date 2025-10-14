"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
}: RegisterModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Kayıt Ol</DialogTitle>

          <DialogDescription className="mt-2 text-gray-500">
            Hesap oluşturmak için bilgilerinizi girin.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 mt-6">
          <Input type="text" placeholder="Ad Soyad" className="w-full" />
          <Input type="email" placeholder="E-posta" className="w-full" />
          <Input type="password" placeholder="Şifre" className="w-full" />
          <Button
            type="submit"
            className="w-full bg-[#92e676] hover:bg-gray-700"
          >
            Kayıt Ol
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Zaten hesabınız var mı?{" "}
          <button
            type="button"
            className="text-[#001e59] font-medium hover:underline"
            onClick={onLoginClick}
          >
            Giriş Yap
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
