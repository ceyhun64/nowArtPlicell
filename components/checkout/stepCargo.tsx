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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Tipler ---
interface CargoOption {
  id: string;
  name: string;
  fee: number;
}

interface StepCargoProps {
  cargoOptions: CargoOption[];
  selectedCargo: string;
  setSelectedCargo: (id: string) => void;
  setStep: (step: number) => void;
}

export default function StepCargo({
  cargoOptions,
  selectedCargo,
  setSelectedCargo,
  setStep,
}: StepCargoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kargo Seçimi</CardTitle>
        <CardDescription>
          Siparişinizin teslimatı için bir kargo firması seçin.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Select
          value={selectedCargo || ""}
          onValueChange={(val) => setSelectedCargo(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Bir kargo firması seçin" />
          </SelectTrigger>
          <SelectContent>
            {cargoOptions.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name} ({c.fee.toFixed(2)}TL)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>

      <CardFooter className="flex justify-between w-full">
        <Button variant="outline" onClick={() => setStep(1)}>
          Geri
        </Button>
        <Button onClick={() => setStep(3)} disabled={!selectedCargo}>
          Kart Bilgisine Geç
        </Button>
      </CardFooter>
    </Card>
  );
}
