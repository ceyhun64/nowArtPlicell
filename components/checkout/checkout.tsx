"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// Yeni Bileşenleri Import Edin
import PaymentStepper from "@/components/checkout/paymentStepper";
import StepAddress from "@/components/checkout/stepAddress";
import StepCargo from "@/components/checkout/stepCargo";
import StepPaymentCard from "@/components/checkout/stepPayment";
import BasketSummaryCard from "@/components/checkout/cartSummary"; // Sepet özet bileşeni
import Loading from "@/components/layout/loading";

// Kargo Seçenekleri (Sabit tutuldu)
const cargoOptions = [
  { id: "standart", name: "Standart Kargo", fee: 12.0 },
  { id: "express", name: "Hızlı Kargo", fee: 22.0 },
];

// Yeni Adres Formu için başlangıç state'i
const initialAddressForm = {
  title: "",
  firstName: "",
  lastName: "",
  address: "",
  district: "",
  city: "",
  zip: "",
  phone: "",
};

// --- Tipler ---
interface Address {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  zip: string;
  phone: string;
}

interface User {
  id: string;
  email: string;
  createdAt: string;
  addresses: Address[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  mainImage: string;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  strollerCover?: boolean;
  hatToyOption?: string;
  customName?: string;
}

// --- ANA BİLEŞEN ---
export default function PaymentPage() {
  const router = useRouter();

  // Mock kullanıcı ve sepet verisi
  const [user, setUser] = useState<User>({
    id: "1",
    email: "user@example.com",
    createdAt: new Date().toISOString(),
    addresses: [
      {
        id: "1",
        title: "Ev",
        firstName: "Ali",
        lastName: "Veli",
        address: "Örnek Mah. No:12",
        district: "Beşiktaş",
        city: "İstanbul",
        zip: "34353",
        phone: "+905551112233",
      },
    ],
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "p1",
      product: {
        id: "prod1",
        name: "Bebek Arabası",
        price: 499,
        category: "baby-stroller",
        mainImage: "/placeholder.png",
      },
      quantity: 1,
      strollerCover: true,
      hatToyOption: "none",
    },
    {
      id: "p2",
      product: {
        id: "prod2",
        name: "Oyuncak Seti",
        price: 149,
        category: "toys",
        mainImage: "/placeholder.png",
      },
      quantity: 2,
      hatToyOption: "ruffle",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState<number>(1);
  const [selectedAddress, setSelectedAddress] = useState<string>(user.addresses[0].id);
  const [selectedCargo, setSelectedCargo] = useState<string>(cargoOptions[0].id);

  // Kart bilgileri
  const [cardNumber, setCardNumber] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");

  // Yeni adres ekleme
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState(initialAddressForm);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  // --- Hesaplamalar ---
  const subTotal = useMemo(() => {
    const STROLLER_COVER_PRICE = 149;
    const HAT_TOY_PRICE = 149;

    return cartItems.reduce((acc, item) => {
      const basePrice = item.product?.price ?? 0;
      const strollerCoverPrice = item.strollerCover ? STROLLER_COVER_PRICE : 0;
      const hatToyPrice =
        item.hatToyOption && item.hatToyOption !== "none" ? HAT_TOY_PRICE : 0;

      return acc + (basePrice + strollerCoverPrice + hatToyPrice) * (item.quantity ?? 1);
    }, 0);
  }, [cartItems]);

  const selectedCargoFee = useMemo(() => {
    const cargo = cargoOptions.find((c) => c.id === selectedCargo);
    return cargo ? cargo.fee : 0;
  }, [selectedCargo]);

  const totalPrice = useMemo(() => subTotal + selectedCargoFee, [subTotal, selectedCargoFee]);

  // --- Yükleme ve Hata Kontrolü ---
  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  // --- Render ---
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Ödeme İşlemleri</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Sütun */}
        <div className="lg:col-span-2 space-y-6">
          <PaymentStepper currentStep={step} />

          {step === 1 && (
            <StepAddress
              user={user}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setStep={setStep}
              isAddingNewAddress={isAddingNewAddress}
              setIsAddingNewAddress={setIsAddingNewAddress}
              newAddressForm={newAddressForm}
              handleAddressFormChange={(e) => {
                const { id, value } = e.target;
                setNewAddressForm((prev) => ({ ...prev, [id]: value }));
              }}
              handleAddNewAddress={() => {}}
              isSavingAddress={isSavingAddress}
            />
          )}

          {step === 2 && (
            <StepCargo
              cargoOptions={cargoOptions}
              selectedCargo={selectedCargo}
              setSelectedCargo={setSelectedCargo}
              setStep={setStep}
            />
          )}

          {step === 3 && (
            <StepPaymentCard
              holderName={holderName}
              setHolderName={setHolderName}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              formattedCardNumber={cardNumber}
              expireMonth={expireMonth}
              setExpireMonth={setExpireMonth}
              expireYear={expireYear}
              setExpireYear={setExpireYear}
              cvc={cvc}
              setCvc={setCvc}
              handlePayment={() => alert("Ödeme simülasyonu")}
              totalPrice={totalPrice}
              setStep={setStep}
            />
          )}
        </div>

        {/* Sağ Sütun: Sepet Özeti */}
        <div className="lg:col-span-1">
          <BasketSummaryCard
            basketItemsData={cartItems}
            subTotal={subTotal}
            selectedCargoFee={selectedCargoFee}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
}
