-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "racketBrand" TEXT NOT NULL,
    "racketModel" TEXT,
    "stringPattern" TEXT NOT NULL,
    "tensionHorizontal" DOUBLE PRECISION NOT NULL,
    "tensionVertical" DOUBLE PRECISION NOT NULL,
    "tensionUnit" TEXT NOT NULL,
    "stringType" TEXT NOT NULL,
    "stringProvided" BOOLEAN NOT NULL DEFAULT false,
    "laborPrice" DOUBLE PRECISION NOT NULL DEFAULT 25.0,
    "stringPrice" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "comments" TEXT,
    "paymentMethod" TEXT NOT NULL DEFAULT 'onsite',
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "status" TEXT NOT NULL DEFAULT 'booked',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "dailyCapacity" INTEGER NOT NULL DEFAULT 2,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClosedDay" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClosedDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClosedDay_date_key" ON "ClosedDay"("date");
