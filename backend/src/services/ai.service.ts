import { GoogleGenerativeAI } from "@google/generative-ai";

import { generatedPaperZodSchema } from "../schemas/generatedPaper.schema.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

type GenerateAssignmentInput = {
  subject: string;
  difficulty: string;
  questionCount: number;
  totalMarks: number;
  questionTypes: string[];
  additionalInstructions?: string | undefined;
};

export async function generateAssignmentPaper(data: GenerateAssignmentInput) {
  const prompt = `
You are an AI system that generates professional academic question papers.

Your task is to generate a COMPLETE structured assessment in STRICT JSON format.

Return ONLY valid JSON.
Do NOT include markdown.
Do NOT include explanations.
Do NOT include comments.
Do NOT wrap JSON in \`\`\`.

==================================================
ASSIGNMENT REQUIREMENTS
==================================================

Subject:
${data.subject}

Difficulty Level:
${data.difficulty}

Total Questions:
${data.questionCount}

Total Marks:
${data.totalMarks}

Allowed Question Types:
${data.questionTypes.join(", ")}

Additional Instructions:
${data.additionalInstructions || "None"}

==================================================
IMPORTANT RULES
==================================================

1. The response MUST be valid JSON.

2. The root object MUST contain:
{
  "sections": [...]
}

3. Generate realistic academic questions.

4. Questions must match:
- subject
- difficulty
- requested question types

5. Every question MUST contain:
- question
- difficulty
- marks
- type

6. Allowed difficulty values ONLY:
- "easy"
- "medium"
- "hard"

7. Allowed question type values ONLY:
- "short-answer"
- "long-answer"
- "mcq"
- "true-false"

8. Distribute marks reasonably across questions.

9. Group questions into sections when appropriate.

10. Sections MUST contain:
- title
- instruction
- questions

==================================================
MCQ RULES
==================================================

If question type is "mcq":

You MUST include:
- options
- answer

Example:

{
  "question": "Which scheduling algorithm uses a fixed time quantum?",
  "difficulty": "medium",
  "marks": 2,
  "type": "mcq",
  "options": [
    "FCFS",
    "Round Robin",
    "SJF",
    "Priority"
  ],
  "answer": "Round Robin"
}

MCQ rules:
- minimum 4 options
- exactly 1 correct answer
- answer must match one option exactly
- options must be realistic and distinct

==================================================
SHORT/LONG ANSWER RULES
==================================================

If question type is:
- "short-answer"
- "long-answer"
- "true-false"

DO NOT include:
- options
- answer

==================================================
OUTPUT FORMAT EXAMPLE
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
        },

        {
          "question": "Which algorithm uses a fixed time quantum?",
          "difficulty": "medium",
          "marks": 2,
          "type": "mcq",
          "options": [
            "FCFS",
            "Round Robin",
            "SJF",
            "Priority"
          ],
          "answer": "Round Robin"
        }
      ]
    }
  ]
}

==================================================
FINAL INSTRUCTIONS
==================================================

- Return ONLY valid JSON
- No markdown
- No explanations
- No extra text
- No trailing commas
- Ensure valid parsable JSON
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  if (!response) {
    throw new Error("No response received from Gemini");
  }

  const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(cleanedResponse);
  } catch {
    throw new Error("Failed to parse Gemini JSON response");
  }

  const validatedResponse = generatedPaperZodSchema.parse(parsedResponse);

  return {
    validatedResponse,
    rawResponse: cleanedResponse,
  };
}
