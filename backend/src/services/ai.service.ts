import OpenAI from "openai";

import {
  generatedPaperZodSchema,
} from "../schemas/generatedPaper.schema.js";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,

  baseURL:
    "https://openrouter.ai/api/v1",
});

type GenerateAssignmentInput = {
  subject: string;

  difficulty: string;

  questionCount: number;

  totalMarks: number;

  questionTypes: string[];

  additionalInstructions?: string;

  extractedText?: string;
};

export async function generateAssignmentPaper(
  data: GenerateAssignmentInput,
) {

  const prompt = `
You are an AI system that generates professional academic question papers.

Return ONLY valid JSON.

==================================================
ASSIGNMENT REQUIREMENTS
==================================================

Subject:
${data.subject}

Difficulty:
${data.difficulty}

Total Questions:
${data.questionCount}

Total Marks:
${data.totalMarks}

Allowed Question Types:
${data.questionTypes.join(", ")}

Additional Instructions:
${data.additionalInstructions || "None"}

Reference Material:
${data.extractedText || "None"}

==================================================
STRICT RULES
==================================================

1. Return ONLY valid JSON
2. No markdown
3. No explanations
4. No comments
5. No trailing commas

==================================================
JSON FORMAT
==================================================

{
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions",
      "questions": [
        {
          "question": "Define process scheduling.",
          "difficulty": "easy",
          "marks": 2,
          "type": "short-answer"
        }
      ]
    }
  ]
}

==================================================
MCQ RULES
==================================================

If type is "mcq":
- include options
- include answer
- minimum 4 options
- exactly 1 correct answer

==================================================
VALID VALUES
==================================================

difficulty:
- easy
- medium
- hard

question types:
- short-answer
- long-answer
- mcq
- true-false
`;

  let completion;

  const maxRetries = 3;

  for (
    let attempt = 1;
    attempt <= maxRetries;
    attempt++
  ) {

    try {

      completion =
        await openai.chat.completions.create({
          model:
            "deepseek/deepseek-chat-v3-0324",

          messages: [
            {
              role: "user",

              content: prompt,
            },
          ],

          temperature: 0.7,
        });

      break;

    } catch (error) {

      if (attempt === maxRetries) {
        throw error;
      }

      console.log(
        `Retrying AI request... Attempt ${attempt}`,
      );

      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 2000),
      );
    }
  }

  const response =
    completion?.choices?.[0]?.message?.content;

  if (!response) {
    throw new Error(
      "No response received from OpenRouter",
    );
  }

  const cleanedResponse =
    response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  let parsedResponse;

  try {

    parsedResponse =
      JSON.parse(cleanedResponse);

  } catch {

    console.error(cleanedResponse);

    throw new Error(
      "Failed to parse AI JSON response",
    );
  }

  const validatedResponse =
    generatedPaperZodSchema.parse(
      parsedResponse,
    );

  return {
    validatedResponse,

    rawResponse:
      cleanedResponse,
  };
}