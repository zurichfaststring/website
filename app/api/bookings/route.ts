import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";
import { sendBookingConfirmationEmails } from "@/lib/email";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (date) {
      const dateObj = new Date(date);
      where.bookingDate = {
        gte: startOfDay(dateObj),
        lte: endOfDay(dateObj),
      };
    }

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: {
        bookingDate: "asc",
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      bookingDate,
      timeSlot,
      racketBrand,
      racketModel,
      stringPattern,
      tensionHorizontal,
      tensionVertical,
      tensionUnit,
      stringType,
      stringProvided,
      clientName,
      clientEmail,
      clientPhone,
      paymentMethod,
      comments,
      totalPrice,
      laborPrice,
      stringPrice,
      locale,
    } = body;

    // Validate required fields
    if (
      !bookingDate ||
      !timeSlot ||
      !racketBrand ||
      !stringPattern ||
      !tensionHorizontal ||
      !tensionVertical ||
      !tensionUnit ||
      !clientName ||
      !clientEmail ||
      !clientPhone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check availability
    const date = new Date(bookingDate);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const closedDay = await prisma.closedDay.findFirst({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
    });

    if (closedDay) {
      return NextResponse.json(
        { error: "This date is not available" },
        { status: 400 }
      );
    }

    let settings = await prisma.settings.findFirst();
    if (!settings) {
      settings = await prisma.settings.create({
        data: { dailyCapacity: 2 },
      });
    }

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

    if (bookingsCount >= settings.dailyCapacity) {
      return NextResponse.json(
        { error: "No availability for this date" },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingDate: new Date(bookingDate),
        timeSlot,
        racketBrand,
        racketModel,
        stringPattern,
        tensionHorizontal,
        tensionVertical,
        tensionUnit,
        stringType: stringType || "Client fournit",
        stringProvided: stringProvided || false,
        clientName,
        clientEmail,
        clientPhone,
        paymentMethod: paymentMethod || "onsite",
        comments,
        totalPrice,
        laborPrice: laborPrice || 25.0,
        stringPrice,
        status: "booked",
      },
    });

    // Send confirmation emails
    try {
      await sendBookingConfirmationEmails({
        id: booking.id,
        clientName: booking.clientName,
        clientEmail: booking.clientEmail,
        clientPhone: booking.clientPhone,
        bookingDate: booking.bookingDate,
        timeSlot: booking.timeSlot,
        racketBrand: booking.racketBrand,
        racketModel: booking.racketModel,
        stringPattern: booking.stringPattern,
        tensionHorizontal: booking.tensionHorizontal,
        tensionVertical: booking.tensionVertical,
        tensionUnit: booking.tensionUnit,
        stringType: booking.stringType,
        totalPrice: booking.totalPrice,
        comments: booking.comments,
        locale: locale || 'fr',
      });
    } catch (emailError) {
      // Log email error but don't fail the booking
      console.error('Failed to send confirmation emails:', emailError);
    }

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

