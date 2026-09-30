export type BookingData = {
  // Step 1: date
  bookingDate?: Date;
  timeSlot?: string;

  // Step 2: details
  racketBrand?: string;
  racketModel?: string;
  stringPattern?: string;
  tensionHorizontal?: number;
  tensionVertical?: number;
  tensionUnit?: string;
  stringType?: string;
  stringProvided?: boolean;
  comments?: string;

  // Step 3: contact
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  paymentMethod?: string;

  // Result
  bookingId?: string;
};
