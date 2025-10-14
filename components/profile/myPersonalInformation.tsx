"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Sidebar from "./sideBar";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Phone, Mail, Save } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  name: string;
  surname: string;
  phone?: string;
  email: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  countryCode?: string;
}

export default function KisiselBilgilerim() {
  const isMobile = useIsMobile();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    countryCode: "90",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --- Sahte Kullanıcı Verisi ---
  useEffect(() => {
    const FAKE_USER: User = {
      name: "Ahmet",
      surname: "Yılmaz",
      phone: "+905551112233",
      email: "ahmet.yilmaz@example.com",
    };

    setTimeout(() => {
      setUser(FAKE_USER);
      setFormData({
        firstName: FAKE_USER.name,
        lastName: FAKE_USER.surname,
        phone: FAKE_USER.phone?.replace("+90", "") || "",
        email: FAKE_USER.email,
        countryCode: "90",
      });
      setLoading(false);
    }, 700);
  }, []);

  // --- Bilgileri Kaydet ---
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      const fullPhone = formData.phone
        ? `+${formData.countryCode || "90"}${formData.phone}`
        : "";

      const updatedUser: User = {
        name: formData.firstName,
        surname: formData.lastName,
        phone: fullPhone,
        email: formData.email,
      };

      setUser(updatedUser);
      setSaving(false);
      toast.success("Bilgiler başarıyla güncellendi!");
    }, 1200);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Yükleniyor...
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Yetkisiz Erişim
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* İçerik Alanı */}
      <div className="w-full max-w-2xl md:mt-24 md:ms-16 p-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          Kişisel Bilgilerim
        </motion.h2>

        <Card className="shadow-lg border border-gray-200">
          <CardContent className="p-6">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSave}
            >
              {/* Ad */}
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  <span className="text-red-500">*</span> Ad
                </Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Soyad */}
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  <span className="text-red-500">*</span> Soyad
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>

              {/* Telefon */}
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <div className="flex rounded-md border border-gray-300 overflow-hidden">
                  <div className="flex items-center justify-center px-3 text-sm text-gray-500 bg-gray-100 border-r border-gray-300">
                    +{formData.countryCode}
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="5xx xxx xx xx"
                    className="flex-[3_1_0] border-none rounded-none focus-visible:ring-0 min-w-0 px-3"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* E-posta */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  <span className="text-red-500">*</span> E-posta
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-100 text-gray-500 cursor-not-allowed pl-10"
                  />
                </div>
              </div>

              {/* Kaydet Butonu */}
              <div className="md:col-span-2 flex justify-start mt-6">
                <Button
                  type="submit"
                  className="flex items-center gap-2 w-48 bg-green-700 hover:bg-green-800 rounded-md"
                  disabled={saving}
                >
                  {saving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <Save size={16} className="text-white" />
                    </motion.div>
                  ) : (
                    <Save size={16} />
                  )}
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
