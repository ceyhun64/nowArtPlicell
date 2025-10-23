"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";

interface MeasureModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const MeasureModal: React.FC<MeasureModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [current, setCurrent] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const images = ["/measure/measure1.webp", "/measure/measure2.webp"];

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm  z-100 flex justify-center items-center">
      <div className="relative bg-white rounded-2xl shadow-xl w-[90%] md:w-[500px] p-6">
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Ölçü Nasıl Alınır?
        </h2>

        {/* Slider */}
        <div className="relative flex justify-center items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow"
          >
            <ChevronLeft />
          </Button>

          <div className="w-full h-80 flex justify-center items-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex justify-center items-center"
              >
                <Image
                  src={images[current]}
                  alt={`Ölçü ${current + 1}`}
                  width={500}
                  height={500}
                  className="object-contain max-h-80 w-auto rounded-lg"
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow"
          >
            <ChevronRight />
          </Button>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-2 mt-6">
          <Checkbox
            id="measure_accept"
            checked={accepted}
            onCheckedChange={(v) => setAccepted(Boolean(v))}
          />
          <label
            htmlFor="measure_accept"
            className="text-sm text-gray-700 leading-snug"
          >
            Ölçülerimi doğru aldım ve oluşabilecek hataları kabul ediyorum.
          </label>
        </div>

        {/* Alt Butonlar */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-gray-300"
          >
            Kapat
          </Button>
          <Button
            onClick={() => {
              if (!accepted) {
                toast.error("Lütfen onay kutusunu işaretleyin.");
                return;
              }
              onConfirm();
              onClose();
            }}
            className="bg-[#001e59] hover:bg-[#002d80] text-white rounded-xl"
          >
            Onayla
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeasureModal;
