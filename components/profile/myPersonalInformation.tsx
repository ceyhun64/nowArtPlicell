"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Sidebar from "./sideBar";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Mail, Save } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      toast.success("Bilgiler başarıyla güncellendi!");
      setSaving(false);
    }, 1200);
  };

  // --- Skeleton Ekranı ---
  if (loading)
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-1 justify-center items-start px-3 py-16 md:px-8 md:pt-16">
          <div className="w-full max-w-2xl space-y-6">
            {/* Başlık Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-56" /> {/* Başlık iskeleti */}
              <Skeleton className="h-4 w-80" /> {/* Alt açıklama iskeleti */}
            </div>

            {/* Form Card Skeleton */}
            <Card className="shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                ))}
                <div className="md:col-span-2 mt-6">
                  <Skeleton className="h-10 w-48 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Yetkisiz Erişim
      </div>
    );

  // --- Normal İçerik ---
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 justify-center items-start px-3 py-16 md:px-8 md:pt-16">
        <div className="w-full max-w-2xl space-y-6">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-bold text-gray-800">
              Kişisel Bilgilerim
            </h2>
            <p className="text-gray-800">
              Profil bilgilerinizi buradan güncelleyebilirsiniz
            </p>
          </motion.div>

          {/* Form */}
          <Card className="shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8">
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
                      className="absolute left-3 top-3 text-green-500"
                      size={20}
                    />
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="pl-10 focus:ring-2 focus:ring-green-300 transition"
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
                    className="focus:ring-2 focus:ring-green-300 transition"
                    required
                  />
                </div>

                {/* Telefon */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden hover:shadow-md transition">
                    <div className="flex items-center justify-center px-3 text-sm text-gray-500 bg-gray-100 border-r border-gray-300">
                      +{formData.countryCode}
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="5xx xxx xx xx"
                      className="flex-1 border-none focus:ring-0 px-3"
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
                      className="absolute left-3 top-3 text-green-500"
                      size={20}
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
                    className="flex items-center gap-2 w-48 bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all"
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
    </div>
  );
}
