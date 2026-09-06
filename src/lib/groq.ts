import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Active models available on Groq API
const GROQ_MODELS = [
  "qwen/qwen3.8-27b",
  "qwen/qwen3.6-27b",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "groq/compound-mini"
];

async function createChatCompletionWithFallback(params: Omit<Groq.Chat.Completions.ChatCompletionCreateParams, "model">) {
  let lastError: unknown = null;
  for (const model of GROQ_MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        ...params,
        model,
      });
      return completion;
    } catch (err: unknown) {
      console.warn(`Groq model ${model} failed, trying next fallback...`);
      lastError = err;
    }
  }
  throw lastError || new Error("All Groq models failed");
}

export const generateLesson = async (dayNumber: number) => {
  const prompt = `
Generate a highly structured English lesson for day ${dayNumber} of a 100-day course for a Gujarati speaker.
IMPORTANT: You MUST generate NOVEL, unique content every time. Do NOT repeat basic phrases like "What's up?". 
Select a COMPLETELY RANDOM and DIVERSE real-world topic for this lesson (e.g., airport travel, salary negotiation, grocery shopping, complaining about weather, fixing a car, etc.) and base all phrases and vocabulary around that chosen topic.

Output MUST be strictly in JSON format according to the exact structure below. The structure below uses placeholder strings (like "<...>") which you MUST replace with your own generated content. Do NOT add markdown formatting around the JSON (no \`\`\`json).

{
  "day": ${dayNumber},
  "casualPhrases": [
    {
      "phrase": "<casual English phrase>",
      "meaning": "<English meaning of the phrase>",
      "whenToUse": "<When to use this phrase>",
      "example": "<Example sentence>"
    }
  ],
  "professionalPhrases": [
    {
      "phrase": "<professional English phrase>",
      "meaning": "<English meaning of the phrase>",
      "whenToUse": "<When to use this phrase>",
      "example": "<Example sentence>"
    }
  ],
  "grammar": {
    "topic": "<Grammar topic for day ${dayNumber}>",
    "rule": "<Explanation of the grammar rule>",
    "whenToUse": "<When to apply this rule>",
    "examples": [
      "<Example sentence using the rule>"
    ]
  },
  "vocabulary": [
    {
      "word": "<English vocabulary word>",
      "phonetic": "<Phonetic spelling>",
      "gujaratiMeaning": "<Gujarati translation of the word>",
      "whenToUse": "<When to use this word>",
      "example": "<Example sentence using the word>"
    }
  ]
}

The difficulty should progressively increase. Provide 3 casual phrases, 3 professional phrases, 1 grammar topic, and 3 vocabulary words. Ensure clear English explanations and maintain Gujarati ONLY for the vocabulary gujaratiMeaning.
`;

  const chatCompletion = await createChatCompletionWithFallback({
    messages: [
      {
        role: "system",
        content: "You are an expert Full-Stack Developer, UI/UX Designer, and Language Pedagogical Engineer. You generate structured English lessons for Gujarati speakers in pure JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");
};
