"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import { BookingData } from "@/app/booking/page";
import { useTranslations } from "@/lib/translations";

type DetailsStepProps = {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function DetailsStep({ bookingData, updateBookingData, onNext, onBack }: DetailsStepProps) {
  const t = useTranslations();
  const [racketBrand, setRacketBrand] = useState(bookingData.racketBrand || "");
  const [racketModel, setRacketModel] = useState(bookingData.racketModel || "");
  const [stringPattern, setStringPattern] = useState(bookingData.stringPattern || "");
  const [tensionHorizontal, setTensionHorizontal] = useState(bookingData.tensionHorizontal?.toString() || "");
  const [tensionVertical, setTensionVertical] = useState(bookingData.tensionVertical?.toString() || "");
  const [tensionUnit, setTensionUnit] = useState(bookingData.tensionUnit || "kg");
  const [stringProvided, setStringProvided] = useState(bookingData.stringProvided ? "yes" : "no");
  const [stringType, setStringType] = useState(bookingData.stringType || "");
  const [comments, setComments] = useState(bookingData.comments || "");

  const handleNext = () => {
    if (racketBrand && stringPattern && tensionHorizontal && tensionVertical && tensionUnit) {
      updateBookingData({
        racketBrand,
        racketModel,
        stringPattern,
        tensionHorizontal: parseFloat(tensionHorizontal),
        tensionVertical: parseFloat(tensionVertical),
        tensionUnit,
        stringProvided: stringProvided === "yes",
        stringType: stringProvided === "yes" ? stringType : "Client fournit",
        comments,
      });
      onNext();
    }
  };

  const isValid =
    racketBrand &&
    stringPattern &&
    tensionHorizontal &&
    tensionVertical &&
    tensionUnit &&
    (stringProvided === "no" || (stringProvided === "yes" && stringType));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t("booking.detailsStep.racketInfo")}</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="racketBrand">{t("booking.detailsStep.racketBrand")} *</Label>
            <Input
              id="racketBrand"
              value={racketBrand}
              onChange={(e) => setRacketBrand(e.target.value)}
              placeholder={t("booking.detailsStep.racketBrandPlaceholder")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="racketModel">{t("booking.detailsStep.racketModel")}</Label>
            <Input
              id="racketModel"
              value={racketModel}
              onChange={(e) => setRacketModel(e.target.value)}
              placeholder={t("booking.detailsStep.racketModelPlaceholder")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stringPattern">{t("booking.detailsStep.stringPattern")} *</Label>
          <Select value={stringPattern} onValueChange={setStringPattern}>
            <SelectTrigger id="stringPattern">
              <SelectValue placeholder={t("booking.detailsStep.stringPatternPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="16x19">16x19 (standard)</SelectItem>
              <SelectItem value="18x20">18x20 (dense)</SelectItem>
              <SelectItem value="16x18">16x18</SelectItem>
              <SelectItem value="16x20">16x20</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-semibold">{t("booking.detailsStep.tension")}</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tensionHorizontal">{t("booking.detailsStep.tensionHorizontal")} *</Label>
            <Input
              id="tensionHorizontal"
              type="number"
              step="0.5"
              value={tensionHorizontal}
              onChange={(e) => setTensionHorizontal(e.target.value)}
              placeholder={t("booking.detailsStep.tensionHorizontalPlaceholder")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tensionVertical">{t("booking.detailsStep.tensionVertical")} *</Label>
            <Input
              id="tensionVertical"
              type="number"
              step="0.5"
              value={tensionVertical}
              onChange={(e) => setTensionVertical(e.target.value)}
              placeholder={t("booking.detailsStep.tensionVerticalPlaceholder")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tensionUnit">{t("booking.detailsStep.unit")} *</Label>
            <Select value={tensionUnit} onValueChange={setTensionUnit}>
              <SelectTrigger id="tensionUnit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="lbs">lbs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-semibold">{t("booking.detailsStep.stringType")}</h3>
        
        <RadioGroup value={stringProvided} onValueChange={setStringProvided}>
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-slate-50">
            <RadioGroupItem value="no" id="string-no" />
            <Label htmlFor="string-no" className="flex-1 cursor-pointer">
              <div className="font-semibold">{t("booking.detailsStep.ownString")}</div>
              <div className="text-sm text-slate-600">{t("booking.detailsStep.ownStringPrice")}</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-slate-50">
            <RadioGroupItem value="yes" id="string-yes" />
            <Label htmlFor="string-yes" className="flex-1 cursor-pointer">
              <div className="font-semibold">{t("booking.detailsStep.provideString")}</div>
              <div className="text-sm text-slate-600">{t("booking.detailsStep.provideStringPrice")}</div>
            </Label>
          </div>
        </RadioGroup>

        {stringProvided === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="stringType">{t("booking.detailsStep.selectString")} *</Label>
            <Select value={stringType} onValueChange={setStringType}>
              <SelectTrigger id="stringType">
                <SelectValue placeholder={t("booking.detailsStep.selectStringPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Signum Pro Hyperion 1.30mm Monofilament">
                  Signum Pro Hyperion 1.30mm Monofilament - 10 CHF
                </SelectItem>
                <SelectItem value="Technifibre MFP FUSION Multifilament HDMX 1.35mm">
                  Technifibre MFP FUSION Multifilament HDMX 1.35mm - 16 CHF
                </SelectItem>
              </SelectContent>
            </Select>
            {stringType && (
              <div className="mt-2 p-3 bg-brand-pale border-2 border-brand rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-darker" />
                <p className="text-sm font-semibold text-slate-800">
                  {t("booking.detailsStep.stringPrice")} {stringType.includes("Signum") ? "10.00" : "16.00"} CHF
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 border-t space-y-2">
        <Label htmlFor="comments">{t("booking.detailsStep.comments")}</Label>
        <Textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder={t("booking.detailsStep.commentsPlaceholder")}
          rows={3}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          {t("booking.back")}
        </Button>
        <Button onClick={handleNext} disabled={!isValid} size="lg">
          {t("booking.next")}
        </Button>
      </div>
    </div>
  );
}

