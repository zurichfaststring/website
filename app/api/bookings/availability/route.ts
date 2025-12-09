import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
    }

    const date = new Date(dateParam);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    // Check if day is closed
    const closedDay = await prisma.closedDay.findFirst({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
    });

    if (closedDay) {
      return NextResponse.json({
        available: false,
        bookingsCount: 0,
        capacity: 0,
        reason: closedDay.reason || "Ce jour est fermé",
      });
    }

    // Get daily capacity settings
    let settings = await prisma.settings.findFirst();
    if (!settings) {
      // Create default settings if they don't exist
      settings = await prisma.settings.create({
        data: {
          dailyCapacity: 2,
        },
      });
    }

    // Count existing bookings for this date
    const bookingsCount = await prisma.booking.count({
      where: {
        bookingDate: {
          gte: dayStart,
          lte: dayEnd,
        },
        status: {
          not: "cancelled",
        },
      },
    });

    const available = bookingsCount < settings.dailyCapacity;

    return NextResponse.json({
      available,
      bookingsCount,
      capacity: settings.dailyCapacity,
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

