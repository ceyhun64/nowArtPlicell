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
import AdresForm from "./addressForm";

interface Address {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  neighborhood?: string; // Eklenen alan, opsiyonel bırakılabilir
  zip?: string;
  phone?: string;
  country?: string;
  email?: string;
}

// AddressFormProps ve AddressFormData interface'leri zaten AdresForm bileşeninden geliyor.
// Ancak AdresForm bileşenindeki AddressFormData tanımı ile aynı olmalı.

interface AddressFormData {
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  neighborhood: string;
  zip?: string; // Formda yok, opsiyonel yapıldı
  phone?: string; // Formda yok, opsiyonel yapıldı
  country?: string; // Formda yok, opsiyonel yapıldı
  email?: string;
}

export default function Adreslerim() {
  const [adresler, setAdresler] = useState<Address[]>([]);
  const [yeniAdresForm, setYeniAdresForm] = useState(false);
  const [duzenleForm, setDuzenleForm] = useState(false);
  const [duzenlenenAdres, setDuzenlenenAdres] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  // Formdan kaldırılan alanlar için boş string yerine boşluklar (varsayılan değerler)
  const initialFormData: AddressFormData = {
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
    neighborhood: "",
    zip: "",
    phone: "",
    country: "Türkiye", // Varsayılan ülke
    email: "",
  };

  const [ekleFormData, setEkleFormData] =
    useState<AddressFormData>(initialFormData);

  const [duzenleFormData, setDuzenleFormData] =
    useState<AddressFormData>(initialFormData);

  // 🔹 Adresleri Yükle
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch("/api/address", { method: "GET" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Adresler yüklenemedi.");
        // Gelen veride neighborhood yoksa boş string ataması eklendi.
        const addressesWithNeighborhood: Address[] = (data.addresses || []).map(
          (a: Address) => ({
            ...a,
            neighborhood: a.neighborhood || "",
            zip: a.zip || "",
            phone: a.phone || "",
            country: a.country || "Türkiye",
          })
        );
        setAdresler(addressesWithNeighborhood);
      } catch (error) {
        console.error(error);
        toast.error("Adresler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // 🔹 Adres Silme (Kodda değişiklik yok)
  const handleSil = async (id: number) => {
    try {
      const res = await fetch(`/api/address/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Adres silinemedi.");
      setAdresler((prev) => prev.filter((a) => a.id !== id));
      toast.success("Adres başarıyla silindi.");
    } catch (error) {
      console.error(error);
      toast.error("Adres silinirken bir hata oluştu.");
    }
  };

  // 🔹 Yeni Adres Ekle (Zorunlu alanlar kontrolü güncellendi)
  const handleEkleKaydet = async () => {
    // Formdaki zorunlu alanlar: title, firstName, lastName, address, city, district, neighborhood
    if (
      !ekleFormData.title ||
      !ekleFormData.firstName ||
      !ekleFormData.lastName ||
      !ekleFormData.address ||
      !ekleFormData.district ||
      !ekleFormData.city ||
      !ekleFormData.neighborhood // Mahalle eklendi
    ) {
      toast.error("Lütfen tüm zorunlu alanları (*) doldurun.");
      return;
    }

    try {
      const res = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ekleFormData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Adres eklenemedi.");

      // Yeni eklenen adresin de neighborhood, zip, phone, country alanları olmalı
      const newAddress: Address = {
        ...data.address,
        neighborhood: data.address.neighborhood || "",
        zip: data.address.zip || "",
        phone: data.address.phone || "",
        country: data.address.country || "Türkiye",
      };

      setAdresler((prev) => [newAddress, ...prev]);
      toast.success("Adres başarıyla eklendi.");
      setYeniAdresForm(false);
      setEkleFormData(initialFormData); // Formu temizle
    } catch (error) {
      console.error(error);
      toast.error("Adres eklenirken bir hata oluştu.");
    }
  };

  // 🔹 Adres Düzenleme
  const handleDuzenle = (adres: Address) => {
    setDuzenlenenAdres(adres);
    setDuzenleFormData({
      title: adres.title,
      firstName: adres.firstName,
      lastName: adres.lastName,
      address: adres.address,
      district: adres.district,
      city: adres.city,
      neighborhood: adres.neighborhood || "", // Varsayılan değer atandı
      zip: adres.zip || "", // Varsayılan değer atandı
      phone: adres.phone || "", // Varsayılan değer atandı
      country: adres.country || "Türkiye", // Varsayılan değer atandı
      email: adres.email,
    });
    setDuzenleForm(true);
    setYeniAdresForm(false); // Yeni adres formunu kapat
  };

  // 🔹 Adres Düzenleme Kaydet (Kodda değişiklik yok)
  const handleDuzenleKaydet = async () => {
    if (!duzenlenenAdres) return;

    // Düzenleme formunda da zorunlu alan kontrolü yapılabilir.
    if (
      !duzenleFormData.title ||
      !duzenleFormData.firstName ||
      !duzenleFormData.lastName ||
      !duzenleFormData.address ||
      !duzenleFormData.district ||
      !duzenleFormData.city ||
      !duzenleFormData.neighborhood
    ) {
      toast.error("Lütfen tüm zorunlu alanları (*) doldurun.");
      return;
    }

    try {
      const res = await fetch(`/api/address/${duzenlenenAdres.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duzenleFormData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Adres güncellenemedi.");

      const updatedAddress: Address = {
        ...data.address,
        neighborhood: data.address.neighborhood || "",
        zip: data.address.zip || "",
        phone: data.address.phone || "",
        country: data.address.country || "Türkiye",
      };

      setAdresler((prev) =>
        prev.map((a) => (a.id === duzenlenenAdres.id ? updatedAddress : a))
      );
      toast.success("Adres başarıyla güncellendi.");
      setDuzenleForm(false);
      setDuzenlenenAdres(null);
    } catch (error) {
      console.error(error);
      toast.error("Adres güncellenirken bir hata oluştu.");
    }
  };

  // 🔸 Skeleton Yükleme (Kodda değişiklik yok)
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-1 justify-center items-start px-3 py-16 md:px-8 md:pt-16">
          <div className="w-full max-w-2xl space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card
                key={i}
                className="shadow-xl border border-gray-200 rounded-2xl bg-white"
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

  // 🔸 Normal render (Adres listeleme kısmı güncellendi)
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 justify-center items-start px-3 py-16 md:px-8 md:pt-16 bg-cover bg-center">
        <div className="w-full max-w-2xl space-y-6">
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800">Adreslerim</h2>
            <p className="text-gray-800">
              Adreslerinizi buradan yönetebilirsiniz
            </p>
          </motion.div>

          {/* Yeni Adres Butonu */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                setYeniAdresForm((prev) => !prev);
                setDuzenleForm(false);
                setEkleFormData(initialFormData); // Formu temizle
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
                <Card className="shadow-xl border border-gray-200 bg-white rounded-2xl">
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
                <Card className="shadow-xl border border-gray-200 bg-white rounded-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Adresi Düzenle: {duzenlenenAdres.title}
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
                    className="shadow-xl border border-gray-200 bg-white rounded-2xl"
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
                            {a.neighborhood && a.neighborhood + ", "}
                            {a.district} — {a.city} {a.zip}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {a.phone}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {a.country}
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
