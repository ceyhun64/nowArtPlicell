import React from "react";

// --- Tipler ---
interface StepIndicatorProps {
  step: number;
  currentStep: number;
  label: string;
}

interface PaymentStepperProps {
  currentStep: number;
}

// StepIndicator Component
const StepIndicator: React.FC<StepIndicatorProps> = ({ step, currentStep, label }) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div
      className={`flex flex-col items-center w-1/3 ${
        step > 1 ? "border-l pl-4 border-gray-200 dark:border-gray-700" : ""
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isCompleted
            ? "bg-green-500 text-white"
            : isActive
            ? "bg-primary text-primary-foreground"
            : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
        }`}
      >
        {isCompleted ? "✓" : step}
      </div>
      <span
        className={`mt-2 text-center text-xs transition-colors duration-300 ${
          isActive ? "text-primary font-semibold" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

// PaymentStepper Component
const PaymentStepper: React.FC<PaymentStepperProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between mb-6 text-sm font-medium text-center">
      <StepIndicator step={1} currentStep={currentStep} label="Adres" />
      <StepIndicator step={2} currentStep={currentStep} label="Kargo" />
      <StepIndicator step={3} currentStep={currentStep} label="Kart Bilgileri" />
    </div>
  );
};

export default PaymentStepper;
