"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookingData } from "@/app/booking/page";
import { AlertCircle, BadgeCheck } from "lucide-react";
import { useTranslations } from "@/lib/translations";

type ContactStepProps = {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onBack: () => void;
  onComplete: () => void;
};

export default function ContactStep({ bookingData, updateBookingData, onBack, onComplete }: ContactStepProps) {
  const t = useTranslations('booking.contactStep');
  const tBooking = useTranslations('booking');
  const [clientName, setClientName] = useState(bookingData.clientName || "");
  const [clientEmail, setClientEmail] = useState(bookingData.clientEmail || "");
  const [clientPhone, setClientPhone] = useState(bookingData.clientPhone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getStringPrice = () => {
    if (!bookingData.stringProvided) return 0;
    if (bookingData.stringType?.includes("Signum")) return 10;
    if (bookingData.stringType?.includes("Technifibre")) return 16;
    return 0;
  };

  const calculateTotal = () => {
    const laborPrice = 25;
    const stringPrice = getStringPrice();
    return laborPrice + stringPrice;
  };

  const handleSubmit = async () => {
    if (!clientName || !clientEmail || !clientPhone) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Get current language from localStorage
      const locale = typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en';
      
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          clientName,
          clientEmail,
          clientPhone,
          paymentMethod: "onsite",
          totalPrice: calculateTotal(),
          laborPrice: 25,
          stringPrice: getStringPrice() || null,
          locale,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || t('error'));
      }

      const data = await response.json();
      updateBookingData({
        clientName,
        clientEmail,
        clientPhone,
        paymentMethod: "onsite",
        bookingId: data.booking.id,
      });
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setLoading(false);
    }
  };

  const isValid = clientName && clientEmail && clientPhone;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('yourInfo')}</h3>
        
        <div className="space-y-2">
          <Label htmlFor="clientName">{t('fullName')} *</Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder={t('fullNamePlaceholder')}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientEmail">{t('email')} *</Label>
          <Input
            id="clientEmail"
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientPhone">{t('phone')} *</Label>
          <Input
            id="clientPhone"
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder={t('phonePlaceholder')}
            required
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-semibold">{t('payment')}</h3>
        
        <div className="p-4 border-2 rounded-lg bg-brand-pale border-brand">
          <div className="flex items-center gap-3 mb-2">
            <BadgeCheck className="w-5 h-5 text-brand-darker" />
            <div className="font-semibold text-slate-900">{t('paymentOnsite')}</div>
          </div>
          <div className="text-sm text-slate-600">{t('paymentAccepted')}</div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg space-y-2">
        <h3 className="font-semibold">{t('priceSummary')}</h3>
        <div className="flex justify-between text-sm">
          <span>{t('labor')}</span>
          <span className="font-medium">25.00 CHF</span>
        </div>
        {bookingData.stringProvided && (
          <div className="flex justify-between text-sm">
            <span>{t('string')}</span>
            <span className="font-medium">{getStringPrice().toFixed(2)} CHF</span>
          </div>
        )}
        {bookingData.stringProvided && bookingData.stringType && (
          <p className="text-xs text-slate-500 italic">
            {bookingData.stringType}
          </p>
        )}
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>{t('total')}</span>
          <span>{calculateTotal().toFixed(2)} CHF</span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg" disabled={loading}>
          {tBooking('back')}
        </Button>
        <Button onClick={handleSubmit} disabled={!isValid || loading} size="lg">
          {loading ? t('submitting') : tBooking('submit')}
        </Button>
      </div>
    </div>
  );
}

