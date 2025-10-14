import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// --- Props Tipleri ---
interface StepPaymentCardProps {
  holderName: string;
  setHolderName: (value: string) => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  formattedCardNumber: string;
  expireMonth: string;
  setExpireMonth: (value: string) => void;
  expireYear: string;
  setExpireYear: (value: string) => void;
  cvc: string;
  setCvc: (value: string) => void;
  handlePayment: () => void;
  totalPrice: number;
  setStep: (step: number) => void;
}

export default function StepPaymentCard({
  holderName,
  setHolderName,
  cardNumber,
  setCardNumber,
  formattedCardNumber,
  expireMonth,
  setExpireMonth,
  expireYear,
  setExpireYear,
  cvc,
  setCvc,
  handlePayment,
  totalPrice,
  setStep,
}: StepPaymentCardProps) {
  const isFormValid =
    cardNumber && cvc && holderName && expireMonth && expireYear;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kart Bilgileri</CardTitle>
        <CardDescription>
          Ödemenizi tamamlamak için kart bilgilerinizi giriniz.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="holderName">Kart Sahibinin Adı</Label>
          <Input
            id="holderName"
            placeholder="Kart Üzerindeki İsim"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value.toUpperCase())}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardNumber">Kart Numarası</Label>
          <Input
            id="cardNumber"
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength={19} // 16 rakam + 3 boşluk
            value={formattedCardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expireMonth">Ay</Label>
            <Input
              id="expireMonth"
              placeholder="AA"
              maxLength={2}
              value={expireMonth}
              onChange={(e) =>
                setExpireMonth(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expireYear">Yıl</Label>
            <Input
              id="expireYear"
              placeholder="YY"
              maxLength={2}
              value={expireYear}
              onChange={(e) =>
                setExpireYear(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              placeholder="***"
              maxLength={3}
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between w-full">
        <Button variant="outline" onClick={() => setStep(2)}>
          Geri
        </Button>
        <Button onClick={handlePayment} disabled={!isFormValid}>
          Ödemeyi Tamamla {totalPrice.toFixed(2)}TL
        </Button>
      </CardFooter>
    </Card>
  );
}
