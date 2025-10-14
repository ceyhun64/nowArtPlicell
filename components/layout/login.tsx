"use client";

import React from "react";
import { X } from "lucide-react";
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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
}: LoginModalProps) {
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
            >
              <Input
                type="email"
                placeholder="E-posta"
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-purple-500"
              />
              <Input
                type="password"
                placeholder="Şifre"
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-purple-500"
              />

              <Button
                type="submit"
                className="w-full bg-[#92e676] hover:bg-gray-900 text-white transition-all rounded-xl py-2"
              >
                
                Giriş Yap
              </Button>
            </motion.form>

            <DialogFooter className="mt-4 flex justify-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hesabınız yok mu?{" "}
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="text-[#001e59] hover:underline font-medium"
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
