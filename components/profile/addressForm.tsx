"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react"; // Info kaldırıldı
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cities from "@/public/city.json";

// Kullanılmayan alanlar (zip, phone, country) opsiyonel yapıldı,
// neighborhood formda zorunlu olduğu için zorunluluk kaldırıldı (API'ye göre).
export interface AddressFormData {
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  neighborhood: string; // Formda zorunlu olduğu için opsiyonel değil
  zip?: string; // Formda yok, opsiyonel
  phone?: string; // Formda yok, opsiyonel
  country?: string; // Formda yok, opsiyonel (varsayılan Türkiye)
}

export interface AddressFormProps {
  formData: AddressFormData;
  setFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onSave: () => void;
}

interface City {
  id: string;
  name: string;
}
interface District {
  id: string;
  name: string;
}
interface Neighborhood {
  id: string;
  name: string;
}

export default function AdresForm({
  formData,
  setFormData,
  onSave,
}: AddressFormProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  useEffect(() => {
    // city.json'dan şehir adlarını yükle
    const cityArray: City[] = Object.entries(Cities).map(([id, name]) => ({
      id,
      name,
    }));
    setCities(cityArray);
  }, []);

  // İlçe fetch (Şehir seçimi değiştiğinde)
  useEffect(() => {
    if (!formData.city) {
      setDistricts([]);
      setNeighborhoods([]);
      setFormData((prev) => ({ ...prev, district: "", neighborhood: "" }));
      return;
    }

    // Seçilen şehrin ID'sini bul
    const selectedCityId = cities.find((c) => c.name === formData.city)?.id;
    if (!selectedCityId) return;

    fetch(`/api/location/ilceler/${selectedCityId}`)
      .then((res) => {
        if (!res.ok) throw new Error("İlçe verisi alınamadı");
        return res.json();
      })
      .then((data: District[]) => {
        setDistricts(data);
        setNeighborhoods([]);
        // İlçe listesi yenilendiği için ilçe ve mahalle sıfırlanmalı
        setFormData((prev) => ({ ...prev, district: "", neighborhood: "" }));
      })
      .catch(console.error);
  }, [formData.city, cities, setFormData]);

  // Mahalle fetch (İlçe seçimi değiştiğinde)
  useEffect(() => {
    if (!formData.district) {
      setNeighborhoods([]);
      setFormData((prev) => ({ ...prev, neighborhood: "" }));
      return;
    }

    // Seçilen ilçenin ID'sini bul
    const selectedDistrict = districts.find(
      (d) => d.name === formData.district
    );
    if (!selectedDistrict) return;

    fetch(`/api/location/mahalleler/${selectedDistrict.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Mahalle verisi alınamadı");
        return res.json();
      })
      .then((data: Neighborhood[]) => {
        setNeighborhoods(data);
        // Mahalle listesi yenilendiği için mahalle sıfırlanmalı
        setFormData((prev) => ({ ...prev, neighborhood: "" }));
      })
      .catch(console.error);
  }, [formData.district, districts, setFormData]);

  // Şehir Select Value'sunda name yerine ID kullanıldığı için,
  // onValueChange'de selectedCity.name'i atıyoruz.
  // İlçe Select Value'sunda ID kullanıldığı için,
  // onValueChange'de selectedDistrict.name'i atıyoruz.
  // Mahalle Select Value'sunda name kullanıldığı için,
  // onValueChange'de sadece name'i atıyoruz (Select'in kendisinden geliyor).

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      {/* Adres Başlığı */}
      <div className="space-y-1 md:col-span-2">
        <Label htmlFor="title">Adres Başlığı *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      {/* Ad / Soyad */}
      <div className="space-y-1">
        <Label htmlFor="firstName">Ad *</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="lastName">Soyad *</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
      </div>

      {/* Şehir */}
      <div className="space-y-1">
        <Label htmlFor="city">Şehir *</Label>
        <Select
          // Select value, Cities listesindeki ID'yi tutar, ancak biz formData'da name tutuyoruz.
          // Bu nedenle ID'ye göre bulup atama yapmalıyız.
          value={cities.find((c) => c.name === formData.city)?.id || ""}
          onValueChange={(value) => {
            const selectedCity = cities.find((c) => c.id === value);
            setFormData((prev) => ({
              ...prev,
              city: selectedCity?.name || "",
              district: "",
              neighborhood: "",
            }));
          }}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* İlçe */}
      <div className="space-y-1">
        <Label htmlFor="district">İlçe *</Label>
        <Select
          // Select value, Districts listesindeki ID'yi tutar (string olarak), ancak biz formData'da name tutuyoruz.
          value={
            districts
              .find((d) => d.name === formData.district)
              ?.id.toString() || ""
          }
          onValueChange={(value) => {
            // value burada ID (string)
            const selectedDistrict = districts.find(
              (d) => d.id.toString() === value
            );
            setFormData((prev) => ({
              ...prev,
              district: selectedDistrict?.name || "", // Seçilen ilçenin adını ata
              neighborhood: "", // İlçe değişti, mahalle sıfırlanmalı
            }));
          }}
          disabled={!formData.city || districts.length === 0}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((d) => (
              <SelectItem key={d.id} value={d.id.toString()}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mahalle */}
      <div className="space-y-1">
        <Label htmlFor="neighborhood">Mahalle *</Label>
        <Select
          // Select value, mahalle adını (name) tutar.
          value={formData.neighborhood}
          onValueChange={(value) => {
            // value burada mahalle adı (name)
            setFormData((prev) => ({
              ...prev,
              neighborhood: value || "", // Gelen değeri doğrudan ata
            }));
          }}
          disabled={!formData.district || neighborhoods.length === 0}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoods.map((n) => (
              // Mahalle listesinde hem id hem de name var. value olarak name kullanabiliriz.
              <SelectItem key={n.id} value={n.name}>
                {n.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="address">Posta Kodu *</Label>
        <Input
          id="zipCode"
          value={formData.zip}
          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Telefon *</Label>
        <Input
          id="telefon"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      {/* Adres Detayı (Sokak/Cadde/Bina No) */}
      <div className="space-y-1 md:col-span-2">
        <Label htmlFor="address">Adres Detayı (Sokak/Cadde/Bina No) *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />
      </div>

      {/* Posta Kodu, Telefon, Ülke alanları formdan kaldırıldı. */}

      {/* Kaydet */}
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
