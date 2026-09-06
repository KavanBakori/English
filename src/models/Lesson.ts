import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILesson extends Document {
  dayNumber: number;
  casualPhrases: {
    phrase: string;
    meaning: string;
    whenToUse: string;
    example: string;
  }[];
  professionalPhrases: {
    phrase: string;
    meaning: string;
    whenToUse: string;
    example: string;
  }[];
  grammar: {
    topic: string;
    rule: string;
    whenToUse: string;
    examples: string[];
  };
  vocabulary: {
    word: string;
    phonetic: string;
    gujaratiMeaning: string;
    whenToUse: string;
    example: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    dayNumber: { type: Number, required: true, unique: true },
    casualPhrases: [
      {
        phrase: String,
        meaning: String,
        whenToUse: String,
        example: String,
      },
    ],
    professionalPhrases: [
      {
        phrase: String,
        meaning: String,
        whenToUse: String,
        example: String,
      },
    ],
    grammar: {
      topic: String,
      rule: String,
      whenToUse: String,
      examples: [String],
    },
    vocabulary: [
      {
        word: String,
        phonetic: String,
        gujaratiMeaning: String,
        whenToUse: String,
        example: String,
      },
    ],
  },
  { timestamps: true }
);

// Prevent Mongoose from using the old cached schema during hot-reloads
if (mongoose.models.Lesson) {
  delete mongoose.models.Lesson;
}

export const Lesson: Model<ILesson> = mongoose.model<ILesson>("Lesson", LessonSchema);

