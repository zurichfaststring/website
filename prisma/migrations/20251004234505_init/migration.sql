-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "bookingDate" DATETIME NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "racketBrand" TEXT NOT NULL,
    "racketModel" TEXT,
    "stringPattern" TEXT NOT NULL,
    "tensionHorizontal" REAL NOT NULL,
    "tensionVertical" REAL NOT NULL,
    "tensionUnit" TEXT NOT NULL,
    "stringType" TEXT NOT NULL,
    "stringProvided" BOOLEAN NOT NULL DEFAULT false,
    "laborPrice" REAL NOT NULL DEFAULT 25.0,
    "stringPrice" REAL,
    "totalPrice" REAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "comments" TEXT,
    "paymentMethod" TEXT NOT NULL DEFAULT 'onsite',
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "status" TEXT NOT NULL DEFAULT 'booked'
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dailyCapacity" INTEGER NOT NULL DEFAULT 2,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ClosedDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ClosedDay_date_key" ON "ClosedDay"("date");
