import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Lesson } from "@/models/Lesson";
import { User } from "@/models/User";
import { generateLesson } from "@/lib/groq";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const day = searchParams.get("day");
    
    // For MVP, we will use a hardcoded user ID. In production, this would be from auth.
    const userId = "user123";

    if (!day) {
      return NextResponse.json({ error: "Day parameter is required" }, { status: 400 });
    }

    const dayNumber = parseInt(day, 10);

    await connectToDatabase();

    // Ensure user exists
    let user = await User.findOne({ userId });
    if (!user) {
      user = await User.create({ userId, name: "Student" });
    }

    // Check if lesson already exists in DB
    let lesson = await Lesson.findOne({ dayNumber });

    if (!lesson) {
      // Generate new lesson using Groq AI
      const lessonData = await generateLesson(dayNumber);
      
      lesson = await Lesson.create({
        dayNumber: lessonData.day,
        casualPhrases: lessonData.casualPhrases,
        professionalPhrases: lessonData.professionalPhrases,
        grammar: lessonData.grammar,
        vocabulary: lessonData.vocabulary,
      });
    }

    return NextResponse.json({ lesson, user });
  } catch (error) {
    console.error("Error fetching/generating lesson:", error);
    return NextResponse.json(
      { error: "Failed to fetch or generate lesson" },
      { status: 500 }
    );
  }
}
