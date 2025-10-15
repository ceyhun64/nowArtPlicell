"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./sideBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, PlusCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Address {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  zip?: string;
  phone?: string;
}

interface AddressFormProps {
  formData: AddressFormData;
  setFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onSave: () => void;
}

interface AddressFormData {
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  zip: string;
  phone: string;
}

const SAHTE_ADRESLER: Address[] = [
  {
    id: "1",
    title: "Ev",
    firstName: "Ahmet",
    lastName: "Yılmaz",
    address: "Atatürk Caddesi No:12",
    district: "Kadıköy",
    city: "İstanbul",
    zip: "34710",
    phone: "0555 111 2233",
  },
  {
    id: "2",
    title: "İş",
    firstName: "Ahmet",
    lastName: "Yılmaz",
    address: "Maslak Mah. Ofis Sokak No:5",
    district: "Sarıyer",
    city: "İstanbul",
    zip: "34398",
    phone: "0555 222 3344",
  },
];

export default function Adreslerim() {
  const [adresler, setAdresler] = useState<Address[]>([]);
  const [yeniAdresForm, setYeniAdresForm] = useState(false);
  const [duzenleForm, setDuzenleForm] = useState(false);
  const [duzenlenenAdres, setDuzenlenenAdres] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  const [ekleFormData, setEkleFormData] = useState<AddressFormData>({
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [duzenleFormData, setDuzenleFormData] = useState<AddressFormData>({
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
    zip: "",
    phone: "",
  });

  // Sahte veriyi yükle
  useEffect(() => {
    setTimeout(() => {
      setAdresler(SAHTE_ADRESLER);
      setLoading(false);
    }, 700);
  }, []);

  const handleSil = (id: string) => {
    setAdresler((prev) => prev.filter((a) => a.id !== id));
    toast.success("Adres başarıyla silindi.");
  };

  const handleEkleKaydet = () => {
    if (
      !ekleFormData.firstName ||
      !ekleFormData.lastName ||
      !ekleFormData.address ||
      !ekleFormData.district ||
      !ekleFormData.city
    ) {
      toast.error("Lütfen tüm zorunlu alanları (*) doldurun.");
      return;
    }

    const yeniAdres: Address = {
      ...ekleFormData,
      id: (Math.random() * 10000).toFixed(0),
    };
    setAdresler((prev) => [...prev, yeniAdres]);
    toast.success("Adres başarıyla eklendi.");
    setYeniAdresForm(false);
    setEkleFormData({
      title: "",
      firstName: "",
      lastName: "",
      address: "",
      district: "",
      city: "",
      zip: "",
      phone: "",
    });
  };

  const handleDuzenle = (adres: Address) => {
    setDuzenlenenAdres(adres);
    setDuzenleForm(true);
  };

  const handleDuzenleKaydet = () => {
    if (!duzenlenenAdres) return;
    setAdresler((prev) =>
      prev.map((a) =>
        a.id === duzenlenenAdres.id ? { ...duzenleFormData, id: a.id } : a
      )
    );
    toast.success("Adres başarıyla güncellendi.");
    setDuzenleForm(false);
    setDuzenlenenAdres(null);
  };

  // ✅ Skeleton Yükleme Ekranı
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-1 justify-center items-start px-3 py-16 md:px-8 md:pt-16">
          <div className="w-full max-w-2xl space-y-6">
            {/* Başlık Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>

            {/* Adres Kartları Skeleton */}
            {[...Array(2)].map((_, i) => (
              <Card
                key={i}
                className="shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white"
              >
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-4 w-32" />
                  <div className="flex justify-end gap-2 pt-4">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Normal render
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 justify-center items-start px-3 py-16 md:px-8 md:pt-16 bg-cover bg-center relative">
        <div className="w-full max-w-2xl space-y-6 relative z-10">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-bold text-gray-800">Adreslerim</h2>
            <p className="text-gray-800">
              Adreslerinizi buradan yönetebilirsiniz
            </p>
          </motion.div>

          {/* Yeni Adres / Düzenle */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                setYeniAdresForm((prev) => !prev);
                setDuzenleForm(false);
              }}
            >
              {yeniAdresForm ? (
                <span className="text-lg font-bold">×</span>
              ) : (
                <>
                  <PlusCircle size={18} /> Yeni Adres Ekle
                </>
              )}
            </Button>
          </div>

          {/* Formlar */}
          <AnimatePresence>
            {yeniAdresForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Card className="shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold mb-4">Yeni Adres</h3>
                    <AdresForm
                      formData={ekleFormData}
                      setFormData={setEkleFormData}
                      onSave={handleEkleKaydet}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {duzenleForm && duzenlenenAdres && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Card className="shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Adresi Düzenle
                    </h3>
                    <AdresForm
                      formData={duzenleFormData}
                      setFormData={setDuzenleFormData}
                      onSave={handleDuzenleKaydet}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Adres Listesi */}
          {!yeniAdresForm && !duzenleForm && (
            <div className="flex flex-col gap-4">
              {adresler.length > 0 ? (
                adresler.map((a) => (
                  <Card
                    key={a.id}
                    className="shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {a.title}
                          </h3>
                          <p className="text-sm text-gray-700 mt-1">
                            {a.firstName} {a.lastName}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {a.address}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {a.district} — {a.city} {a.zip}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {a.phone}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDuzenle(a)}
                            className="p-2"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSil(a.id)}
                            className="p-2 bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="p-4 rounded-md bg-blue-100 text-sm text-gray-700">
                  Henüz kayıtlı adresiniz yok. Yeni bir adres ekleyebilirsiniz.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ====== FORM BİLEŞENİ ======
function AdresForm({ formData, setFormData, onSave }: AddressFormProps) {
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <div className="space-y-1 md:col-span-2">
        <Label htmlFor="title">
          <span className="text-red-500">*</span> Adres Başlığı
        </Label>
        <Input
          id="title"
          placeholder="(Ev, İş, vb...)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="firstName">
          <span className="text-red-500">*</span> Ad
        </Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="lastName">
          <span className="text-red-500">*</span> Soyad
        </Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </div>

      <div className="space-y-1 md:col-span-2">
        <Label htmlFor="address">
          <span className="text-red-500">*</span> Adres
        </Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="district">
          <span className="text-red-500">*</span> İlçe
        </Label>
        <Input
          id="district"
          value={formData.district}
          onChange={(e) =>
            setFormData({ ...formData, district: e.target.value })
          }
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="city">
          <span className="text-red-500">*</span> Şehir
        </Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="zip">Posta Kodu</Label>
        <Input
          id="zip"
          value={formData.zip}
          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="md:col-span-2 flex justify-start mt-6">
        <Button
          type="submit"
          className="flex items-center gap-2 w-48 bg-green-700 hover:bg-green-800 rounded-md"
        >
          <Save size={16} /> Kaydet
        </Button>
      </div>
    </form>
  );
}
