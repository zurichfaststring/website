"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { fr, de, enUS } from "date-fns/locale";
import { BookingData } from "@/app/booking/page";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "@/lib/translations";

type DateStepProps = {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
};

type AvailabilityInfo = {
  available: boolean;
  bookingsCount: number;
  capacity: number;
  reason?: string;
};

export default function DateStep({ bookingData, updateBookingData, onNext }: DateStepProps) {
  const t = useTranslations();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(bookingData.bookingDate);
  const [timeSlot, setTimeSlot] = useState<string>(bookingData.timeSlot || "");
  const [availability, setAvailability] = useState<AvailabilityInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(enUS);
  
  // Get locale based on stored language
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem("language") || "en";
      const locale = lang === "de" ? de : lang === "fr" ? fr : enUS;
      setCurrentLocale(locale);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      checkAvailability(selectedDate);
    }
  }, [selectedDate]);

  const checkAvailability = async (date: Date) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bookings/availability?date=${date.toISOString()}`);
      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error("Error checking availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedDate && timeSlot) {
      updateBookingData({ bookingDate: selectedDate, timeSlot });
      onNext();
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold mb-4 block">{t("booking.dateStep.title")}</Label>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < today}
            className="rounded-md border shadow"
            locale={currentLocale}
          />
        </div>
      </div>

      {selectedDate && availability && (
        <>
          {!availability.available ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {availability.reason || t("booking.dateStep.notAvailable")}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Alert>
                <AlertDescription>
                  {availability.bookingsCount === 0
                    ? t("booking.dateStep.available")
                    : `${availability.capacity - availability.bookingsCount} ${t("booking.dateStep.slotsRemaining")} ${availability.capacity}.`}
                </AlertDescription>
              </Alert>

              <div>
                <Label className="text-lg font-semibold mb-4 block">{t("booking.dateStep.timeSlot")}</Label>
                <RadioGroup value={timeSlot} onValueChange={setTimeSlot}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-slate-50">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning" className="flex-1 cursor-pointer">
                      <div className="font-semibold">{t("booking.dateStep.morning")}</div>
                      <div className="text-sm text-slate-600">{t("booking.dateStep.morningDesc")}</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-slate-50">
                    <RadioGroupItem value="afternoon" id="afternoon" />
                    <Label htmlFor="afternoon" className="flex-1 cursor-pointer">
                      <div className="font-semibold">{t("booking.dateStep.afternoon")}</div>
                      <div className="text-sm text-slate-600">{t("booking.dateStep.afternoonDesc")}</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}
        </>
      )}

      {selectedDate && (
        <div className="pt-4 border-t">
          <p className="text-sm text-slate-600 mb-4">
            {t("booking.dateStep.title")}: <span className="font-semibold">{format(selectedDate, "PPP", { locale: currentLocale })}</span>
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedDate || !timeSlot || !availability?.available || loading}
          size="lg"
        >
          {t("booking.next")}
        </Button>
      </div>
    </div>
  );
}

