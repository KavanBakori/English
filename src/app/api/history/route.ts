import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Lesson } from "@/models/Lesson";

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all past lessons sorted by dayNumber in descending order
    const lessons = await Lesson.find({}).sort({ dayNumber: -1 }).lean();
    return NextResponse.json({ lessons });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
