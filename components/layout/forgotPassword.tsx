"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Şifremi Unuttum
          </DialogTitle>
          <DialogDescription className="mt-2 text-gray-500">
            Şifrenizi sıfırlamak için e-posta adresinizi girin.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-4 flex flex-col gap-4">
          <Input type="email" placeholder="E-posta" className="w-full" />
          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-700 text-white"
          >
            Şifreyi Sıfırla
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
