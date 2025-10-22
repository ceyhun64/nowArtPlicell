import React, { useState } from "react";
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
import { Loader2 } from "lucide-react"; // spinner

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
  handlePayment: () => Promise<void>;
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
  const [isProcessing, setIsProcessing] = useState(false);

  const isFormValid =
    cardNumber && cvc && holderName && expireMonth && expireYear;

  const onClickPayment = async () => {
    if (!isFormValid) return;
    setIsProcessing(true);
    try {
      await handlePayment();
    } finally {
      setIsProcessing(false);
    }
  };

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
            maxLength={19}
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
              onChange={(e) => setExpireYear(e.target.value.replace(/\D/g, ""))}
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
        <Button
          variant="outline"
          onClick={() => setStep(2)}
          disabled={isProcessing}
        >
          Geri
        </Button>
        <Button
          onClick={onClickPayment}
          disabled={!isFormValid || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> İşlem Yapılıyor...
            </span>
          ) : (
            `Ödemeyi Tamamla ${totalPrice.toFixed(2)} TL`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
