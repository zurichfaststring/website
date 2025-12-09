"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { RacketIcon } from "@/components/icons/TennisIcons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import StepIndicator from "@/components/booking/StepIndicator";
import DateStep from "@/components/booking/DateStep";
import DetailsStep from "@/components/booking/DetailsStep";
import ContactStep from "@/components/booking/ContactStep";
import ConfirmationStep from "@/components/booking/ConfirmationStep";
import { useTranslations } from "@/lib/translations";

export type BookingData = {
  // Étape 1: Date
  bookingDate?: Date;
  timeSlot?: string;
  
  // Étape 2: Détails
  racketBrand?: string;
  racketModel?: string;
  stringPattern?: string;
  tensionHorizontal?: number;
  tensionVertical?: number;
  tensionUnit?: string;
  stringType?: string;
  stringProvided?: boolean;
  comments?: string;
  
  // Étape 3: Contact
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  paymentMethod?: string;
  
  // Résultat
  bookingId?: string;
};

export default function BookingPage() {
  const t = useTranslations();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pale via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex gap-1 sm:gap-3 items-center">
            <LanguageSwitcher />
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-brand-pale text-xs sm:text-sm">
                {t("booking.back")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Booking Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl border-2 border-brand-lighter">
            <CardHeader className="bg-gradient-to-r from-brand-pale to-white border-b">
              <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                <RacketIcon />
                {t("booking.title")}
              </CardTitle>
              <CardDescription className="text-base">
                {step < 4 ? t("booking.title") : t("booking.confirmation.title")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step < 4 && <StepIndicator currentStep={step} />}
              
              {step === 1 && (
                <DateStep
                  bookingData={bookingData}
                  updateBookingData={updateBookingData}
                  onNext={nextStep}
                />
              )}
              
              {step === 2 && (
                <DetailsStep
                  bookingData={bookingData}
                  updateBookingData={updateBookingData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              
              {step === 3 && (
                <ContactStep
                  bookingData={bookingData}
                  updateBookingData={updateBookingData}
                  onBack={prevStep}
                  onComplete={() => setStep(4)}
                />
              )}
              
              {step === 4 && <ConfirmationStep bookingData={bookingData} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
