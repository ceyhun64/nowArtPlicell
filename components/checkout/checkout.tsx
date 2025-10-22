"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import PaymentStepper from "@/components/checkout/paymentStepper";
import StepAddress from "@/components/checkout/stepAddress";
import StepCargo from "@/components/checkout/stepCargo";
import StepPaymentCard from "@/components/checkout/stepPayment";
import BasketSummaryCard from "@/components/checkout/cartSummary";
import Loading from "@/components/layout/loading";
import { AddressFormData } from "@/components/profile/addressForm";

const cargoOptions = [
  { id: "standart", name: "Standart Kargo", fee: 12.0 },
  { id: "express", name: "Hızlı Kargo", fee: 22.0 },
];

interface Address {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  neighborhood?: string | null;
  zip?: string;
  phone?: string;
  country?: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  role?: string;
  phone?: string;
  addresses?: Address[];
}

interface Product {
  id: number;
  title: string;
  pricePerM2: number;
  mainImage: string;
  oldPrice?: number;
  category: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  note?: string | null;
  profile?: string;
  width?: number;
  height?: number;
  device?: string;
}

interface UserUser {
  user: User;
}

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- State tipi ---
  const [user, setUser] = useState<UserUser | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [step, setStep] = useState(1);
  const [selectedCargo, setSelectedCargo] = useState<string>(
    cargoOptions[0].id
  );

  // Kart bilgileri
  const [cardNumber, setCardNumber] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");
  // PaymentPage içinde
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  // user ve addresses yüklendiğinde ilk adresi seçili yap
  useEffect(() => {
    if (user?.user?.addresses?.length) {
      setSelectedAddress(user.user.addresses[0].id);
    }
  }, [user]);

  // Yeni adres ekleme (isteğe bağlı)
  const initialAddressForm: AddressFormData = {
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
    neighborhood: "",
    zip: "",
    phone: "",
    country: "Türkiye",
  };
  const [newAddressForm, setNewAddressForm] =
    useState<AddressFormData>(initialAddressForm);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  // --- Kullanıcı ve sepet verilerini çek ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, cartRes] = await Promise.all([
          fetch("/api/user"),
          fetch("/api/cart"),
        ]);

        if (!userRes.ok || !cartRes.ok) throw new Error("Veri yüklenemedi");

        const userDataRaw: any = await userRes.json();
        console.log("userDataRaw:", userDataRaw);
        const cartData: CartItem[] = await cartRes.json();

        setUser(userDataRaw); // artık user.user değil, direkt user

        setCartItems(cartData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Veri yüklenemedi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(user);

  // --- Hesaplamalar ---
  const subTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const area =
        item.width && item.height ? (item.width * item.height) / 10000 : 1;
      const itemPrice = item.product.pricePerM2 * area;
      return acc + itemPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const selectedCargoFee = useMemo(() => {
    const cargo = cargoOptions.find((c) => c.id === selectedCargo);
    return cargo ? cargo.fee : 0;
  }, [selectedCargo]);

  const totalPrice = useMemo(
    () => subTotal + selectedCargoFee,
    [subTotal, selectedCargoFee]
  );

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;

  const handleSaveAddress = async () => {
    try {
      setIsSavingAddress(true);
      const res = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddressForm),
      });

      if (!res.ok) throw new Error("Adres kaydedilemedi");

      const data = await res.json();
      // Kullanıcı adreslerini güncelle (opsiyonel)
      setUser((prev) =>
        prev
          ? {
              ...prev,
              addresses: [data.address, ...(prev.user.addresses ?? [])], // prev.user yerine prev
            }
          : prev
      );

      setIsAddingNewAddress(false);
      setNewAddressForm(initialAddressForm);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingAddress(false);
    }
  };

  // --- Ödeme işlemi ---
  const handlePayment = async () => {
    if (!user || !user.user.id) {
      return alert("Geçersiz kullanıcı ID. Lütfen giriş yapınız.");
    }

    const userId = Number(user.user.id);
    if (isNaN(userId) || userId <= 0) {
      return alert("Geçersiz kullanıcı ID");
    }

    const shippingAddr = user.user.addresses?.find(
      (a) => a.id === selectedAddress
    );
    if (!shippingAddr) {
      return alert("Adres bulunamadı");
    }

    const buyer = {
      id: userId.toString(),
      buyerName: shippingAddr.firstName || "Adınız",
      buyerSurname: shippingAddr.lastName || "Soyadınız",
      email: user.user.email ?? "",
      identityNumber: "11111111111",
      registrationDate: new Date().toISOString(),
      lastLoginDate: new Date().toISOString(),
      phone: shippingAddr.phone ?? "",
      city: shippingAddr.city ?? "",
      country: shippingAddr.country ?? "Türkiye",
      zipCode: shippingAddr.zip ?? "",
      ip: "127.0.0.1",
    };

    const shippingAddress = {
      contactName: `${shippingAddr.firstName ?? ""} ${
        shippingAddr.lastName ?? ""
      }`.trim(),
      city: shippingAddr.city ?? "",
      country: shippingAddr.country ?? "Türkiye",
      address: shippingAddr.address ?? "",
      zipCode: shippingAddr.zip ?? "",
    };

    const billingAddress = { ...shippingAddress };

    const basketItemsFormatted = cartItems.map((item) => {
      const area =
        item.width && item.height ? (item.width * item.height) / 10000 : 1;
      const unitPrice = item.product.pricePerM2 * area;
      return {
        id: item.product.id.toString(),
        name: item.product.title,
        category1: item.product.category,
        itemType: "PHYSICAL",
        price: unitPrice.toFixed(2),
        unitPrice: item.product.pricePerM2.toFixed(2),
        quantity: item.quantity,
        productId: item.product.id,
        totalPrice: unitPrice.toFixed(2),
        note: item.note,
        profile: item.profile,
        width: item.width,
        height: item.height,
        m2: area,
        device: item.device,
      };
    });

    const paymentCardFormatted = {
      cardHolderName: holderName,
      cardNumber,
      expireMonth,
      expireYear,
      cvc,
    };

    const orderPayload = {
      userId,
      basketItems: basketItemsFormatted,
      shippingAddress,
      billingAddress,
      totalPrice,
      paidPrice: totalPrice,
      currency: "TRY",
      paymentMethod: "iyzipay",
      paymentCard: paymentCardFormatted,
      buyer,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        return router.push("/checkout/unsuccess");
      }

      const data = await res.json();

      if (data.status === "success") {
        // ✅ Ödeme başarılı, sepetteki ürünleri temizle
        await fetch("/api/cart", { method: "DELETE" });

        router.push("/checkout/success");
      } else {
        router.push("/checkout/unsuccess");
      }
    } catch (err) {
      console.error("handlePayment fetch hatası:", err);
      router.push("/checkout/unsuccess");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Ödeme İşlemleri
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PaymentStepper currentStep={step} />
          {step === 1 && user && (
            // StepAddress
            <StepAddress
              addresses={user.user.addresses ?? []}
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress} // state güncellenecek
              onNext={() => setStep(2)}
              newAddressForm={newAddressForm}
              setNewAddressForm={setNewAddressForm}
              onSaveAddress={handleSaveAddress}
              isAddingNewAddress={isAddingNewAddress}
              setIsAddingNewAddress={setIsAddingNewAddress}
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
          {step === 3 && user && (
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
              totalPrice={totalPrice}
              setStep={setStep}
              handlePayment={handlePayment}
            />
          )}
        </div>

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
