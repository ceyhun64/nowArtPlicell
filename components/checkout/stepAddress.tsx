import React from "react";
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
import AdresForm, { AddressFormData } from "@/components/profile/addressForm";
import Loading from "../layout/loading";

interface Address {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  neighborhood?: string | null; // <--- burayı string | null | undefined yap
  zip?: string;
  phone?: string;
  country?: string;
  tcno?: string;
  
}

interface StepAddressProps {
  addresses: Address[];
  selectedAddress: number | null;
  onSelectAddress: (id: number) => void;
  onNext: () => void;
  newAddressForm: AddressFormData;
  setNewAddressForm: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onSaveAddress: () => void;
  isAddingNewAddress: boolean;
  setIsAddingNewAddress: (v: boolean) => void;
  isSavingAddress: boolean;
}

export default function StepAddress({
  addresses,
  selectedAddress,
  onSelectAddress,
  onNext,
  newAddressForm,
  setNewAddressForm,
  onSaveAddress,
  isAddingNewAddress,
  setIsAddingNewAddress,
  isSavingAddress,
}: StepAddressProps) {
  const selected = addresses?.find((a) => a.id === selectedAddress);

  if (!addresses || !Array.isArray(addresses)) {
    return <Loading />;
  }

  
  console.log("addresses", addresses);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adres Seçimi</CardTitle>
        <CardDescription>
          Kaydedilmiş adreslerden birini seçin veya yeni bir adres ekleyin.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Kaydedilmiş adresler */}
        {addresses.length > 0 ? (
          <div className="space-y-2">
            <Label htmlFor="address-select">Adreslerim</Label>
            <Select
              value={selectedAddress?.toString() || ""}
              onValueChange={(val) => {
                onSelectAddress(Number(val));
                setIsAddingNewAddress(false);
              }}
            >
              <SelectTrigger id="address-select">
                <SelectValue
                  placeholder={
                    selected
                      ? `${selected.title} - ${selected.city}`
                      : "Adres Seçin"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((addr) => (
                  <SelectItem key={addr.id} value={addr.id.toString()}>
                    {addr.title} - {addr.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Kayıtlı adres yok.</p>
        )}

        <Separator />

        {/* Yeni adres ekleme butonları */}
        {!isAddingNewAddress ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsAddingNewAddress(true);
              onSelectAddress(0);
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

        {/* Yeni adres formu */}
        {isAddingNewAddress && (
          <div className="p-4 border rounded-md bg-gray-50">
            <AdresForm
              formData={newAddressForm}
              setFormData={setNewAddressForm}
              onSave={onSaveAddress}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedAddress || isAddingNewAddress || isSavingAddress}
        >
          Kargo Seçimine Geç
        </Button>
      </CardFooter>
    </Card>
  );
}
