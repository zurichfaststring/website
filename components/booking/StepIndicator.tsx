"use client";

import { Check } from "lucide-react";
import { useTranslations } from "@/lib/translations";

type StepIndicatorProps = {
  currentStep: number;
};

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const t = useTranslations();
  
  const steps = [
    { number: 1, label: t("booking.steps.date") },
    { number: 2, label: t("booking.steps.details") },
    { number: 3, label: t("booking.steps.contact") },
  ];
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step.number < currentStep
                    ? "text-white shadow-lg scale-110"
                    : step.number === currentStep
                    ? "text-white shadow-lg ring-4"
                    : "bg-slate-200 text-slate-600"
                }`}
                style={step.number < currentStep ? {backgroundColor: '#b1cb29'} : step.number === currentStep ? {backgroundColor: '#b1cb29', '--tw-ring-color': '#c5d96b'} as any : {}}
              >
                {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                step.number <= currentStep ? "text-slate-800 font-semibold" : "text-slate-500"
              }`}>{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 mb-6 rounded transition-all`}
                style={step.number < currentStep ? {backgroundColor: '#b1cb29'} : {backgroundColor: '#e2e8f0'}}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
