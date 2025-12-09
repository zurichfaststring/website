"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { fr, de, enUS } from "date-fns/locale";
import { BookingData } from "@/app/booking/page";
import { useTranslations } from "@/lib/translations";
import { useState, useEffect } from "react";

type ConfirmationStepProps = {
  bookingData: BookingData;
};

export default function ConfirmationStep({ bookingData }: ConfirmationStepProps) {
  const t = useTranslations('booking.confirmation');
  const [currentLocale, setCurrentLocale] = useState('en');
  
  useEffect(() => {
    // Get language from localStorage
    const locale = localStorage.getItem('language') || 'en';
    setCurrentLocale(locale);
  }, []);
  
  const getLocale = (locale: string) => {
    switch (locale) {
      case 'fr': return fr;
      case 'de': return de;
      case 'en': return enUS;
      default: return enUS;
    }
  };
  
  const getTimeSlotLabel = (slot: string): string => {
    const labels: any = {
      fr: {
        morning: "Matin avant 10h",
        afternoon: "Après-midi après 18h",
      },
      de: {
        morning: "Vormittag vor 10 Uhr",
        afternoon: "Nachmittag nach 18 Uhr",
      },
      en: {
        morning: "Morning before 10am",
        afternoon: "Afternoon after 6pm",
      },
    };
    return labels[currentLocale]?.[slot] || slot;
  };
  
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('title')}</h2>
        <p className="text-slate-600">
          {t('message')} <strong>{bookingData.clientEmail}</strong>
        </p>
      </div>

      <Alert className="text-left">
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-semibold">{t('bookingNumber')}: {bookingData.bookingId}</p>
            <p>
              {t('date')}: {bookingData.bookingDate && format(bookingData.bookingDate, "PPP", { locale: getLocale(currentLocale) })}
            </p>
            <p>{t('timeSlot')}: {getTimeSlotLabel(bookingData.timeSlot || "")}</p>
            <p>
              {t('racket')}: {bookingData.racketBrand} {bookingData.racketModel}
            </p>
            <p>
              {t('tension')}: {bookingData.tensionHorizontal}/{bookingData.tensionVertical} {bookingData.tensionUnit}
            </p>
          </div>
        </AlertDescription>
      </Alert>

      <div className="bg-blue-50 p-4 rounded-lg text-left">
        <h3 className="font-semibold text-blue-900 mb-2">{t('nextSteps.title')}</h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>{t('nextSteps.step1')}</li>
          <li>{t('nextSteps.step2')}</li>
          <li>{t('nextSteps.step3')}</li>
          <li>{t('nextSteps.step4')}</li>
        </ol>
      </div>

      <div className="bg-brand-pale p-4 rounded-lg text-left border-2 border-brand">
        <h3 className="font-semibold text-slate-900 mb-3">{t('needHelp')}</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <span>📱</span>
            <a href="https://wa.me/41782074677" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
              WhatsApp: +41 78 207 46 77
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>📧</span>
            <a href="mailto:info@zurichfaststring.ch" className="hover:underline font-medium">
              info@zurichfaststring.ch
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Link href="/">
          <Button size="lg">
            {t('backToHome')}
          </Button>
        </Link>
      </div>
    </div>
  );
}

