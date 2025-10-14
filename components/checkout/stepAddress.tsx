import React, { ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// --- Tipler ---
interface Address {
  id: string | number;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  zip: string;
  phone?: string;

}

interface User {
  addresses?: Address[];
}

interface NewAddressForm extends Omit<Address, "id"> {}

interface StepAddressProps {
  user: User | null;
  selectedAddress: string;
  setSelectedAddress: (id: string) => void;
  setStep: (step: number) => void;
  isAddingNewAddress: boolean;
  setIsAddingNewAddress: (value: boolean) => void;
  newAddressForm: NewAddressForm;
  handleAddressFormChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { id: string, value: string } }
  ) => void;
  handleAddNewAddress: (e: FormEvent<HTMLFormElement>) => void;
  isSavingAddress: boolean;
}

export default function StepAddress({
  user,
  selectedAddress,
  setSelectedAddress,
  setStep,
  isAddingNewAddress,
  setIsAddingNewAddress,
  newAddressForm,
  handleAddressFormChange,
  handleAddNewAddress,
  isSavingAddress,
}: StepAddressProps) {
  const selectedAddressObject = user?.addresses?.find(
    (a) => a.id.toString() === selectedAddress
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adres Seçimi</CardTitle>
        <CardDescription>
          Kaydedilmiş adreslerinizden birini seçin veya yeni bir adres ekleyin.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Kaydedilmiş Adresler */}
        {user && user.addresses && user.addresses.length > 0 ? (
          <div className="space-y-2">
            <Label htmlFor="address-select">Kaydedilmiş Adreslerim</Label>
            <Select
              value={selectedAddress || ""}
              onValueChange={(val) => {
                setSelectedAddress(val);
                setIsAddingNewAddress(false);
              }}
            >
              <SelectTrigger id="address-select">
                <SelectValue
                  placeholder={
                    selectedAddressObject
                      ? `${selectedAddressObject.title} - ${selectedAddressObject.city}`
                      : "Adres Seçin"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {user.addresses.map((addr) => (
                  <SelectItem key={addr.id} value={addr.id.toString()}>
                    {addr.title} - {addr.address.substring(0, 30)}...,{" "}
                    {addr.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Kayıtlı adresiniz yok.</p>
        )}

        <Separator />

        {/* Yeni Adres Ekle / Geri */}
        {!isAddingNewAddress ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsAddingNewAddress(true);
              setSelectedAddress("");
            }}
          >
            + Yeni Adres Ekle
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsAddingNewAddress(false)}
          >
            Kaydedilmiş Adreslere Dön
          </Button>
        )}

        {/* Yeni Adres Formu */}
        {isAddingNewAddress && (
          <form
            onSubmit={handleAddNewAddress}
            className="space-y-4 p-4 border rounded-md bg-gray-50"
          >
            <CardTitle className="text-lg">Yeni Adres Bilgileri</CardTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Adres Başlığı (Örn: Ev, İş)</Label>
                <Input
                  id="title"
                  value={newAddressForm.title}
                  onChange={handleAddressFormChange}
                  placeholder="Evim"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad (*)</Label>
                <Input
                  id="firstName"
                  value={newAddressForm.firstName}
                  onChange={handleAddressFormChange}
                  placeholder="Ad"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad (*)</Label>
                <Input
                  id="lastName"
                  value={newAddressForm.lastName}
                  onChange={handleAddressFormChange}
                  placeholder="Soyad"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres Detayları (*)</Label>
              <Textarea
                id="address"
                value={newAddressForm.address}
                onChange={handleAddressFormChange}
                placeholder="Sokak, No, Kat, Daire..."
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Şehir (*)</Label>
                <Input
                  id="city"
                  value={newAddressForm.city}
                  onChange={handleAddressFormChange}
                  placeholder="Şehir"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">İlçe (*)</Label>
                <Input
                  id="district"
                  value={newAddressForm.district}
                  onChange={handleAddressFormChange}
                  placeholder="İlçe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Posta Kodu</Label>
                <Input
                  id="zip"
                  value={newAddressForm.zip}
                  onChange={handleAddressFormChange}
                  placeholder="34700"
                />
              </div>

              {/* Telefon */}
              <div className="space-y-1">
                <Label htmlFor="phone">Telefon</Label>
                <div className="flex rounded-md border border-gray-300 overflow-hidden">
               

                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Telefon numarası"
                    className="flex-[3_1_0] border-none rounded-none focus-visible:ring-0 min-w-0 px-3"
                    value={newAddressForm.phone}
                    onChange={handleAddressFormChange}
                  />
                </div>
              </div>
            </div>

        

            <Button type="submit" className="w-full" disabled={isSavingAddress}>
              {isSavingAddress ? "Kaydediliyor..." : "Kaydet ve Seç"}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={() => setStep(2)}
          disabled={!selectedAddress || isAddingNewAddress}
        >
          Kargo Seçimine Geç
        </Button>
      </CardFooter>
    </Card>
  );
}
