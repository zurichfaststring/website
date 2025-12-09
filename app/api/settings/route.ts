import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.settings.findFirst();
    
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          dailyCapacity: 2,
        },
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { dailyCapacity } = body;

    if (!dailyCapacity || dailyCapacity < 1) {
      return NextResponse.json(
        { error: "Daily capacity must be at least 1" },
        { status: 400 }
      );
    }

    let settings = await prisma.settings.findFirst();
    
    if (settings) {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: { dailyCapacity },
      });
    } else {
      settings = await prisma.settings.create({
        data: { dailyCapacity },
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

