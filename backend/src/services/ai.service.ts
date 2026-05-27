import OpenAI from "openai";

import { generatedPaperZodSchema } from "../schemas/generatedPaper.schema.js";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,

  baseURL: "https://openrouter.ai/api/v1",
});

type GenerateAssignmentInput = {
  subject: string;

  difficulty: string;

  questionCount: number;

  totalMarks: number;

  questionTypes: {
    type: string;
    questions: number;
    marks: number;
    difficulty: string;
  }[];

  additionalInstructions?: string;

  extractedText?: string;
};

export async function generateAssignmentPaper(data: GenerateAssignmentInput) {
  const prompt = `
You are an expert AI academic assessment generation system.

Your task is to generate a PROFESSIONAL, REALISTIC, WELL-STRUCTURED academic question paper suitable for schools, colleges, and universities.

Return ONLY valid JSON.

==================================================
ASSIGNMENT CONFIGURATION
==================================================

Subject:
${data.subject}

Total Number of Questions:
${data.questionCount}

Total Marks:
${data.totalMarks}

Question Distribution:
${data.questionTypes
  .map(
    (item) =>
      `- ${item.questions} ${item.difficulty} ${item.type} questions worth ${item.marks} marks each`,
  )
  .join("\n")}

Additional Instructions:
${data.additionalInstructions || "None"}

Reference Material:
${data.extractedText || "None"}

==================================================
CORE GENERATION REQUIREMENTS
==================================================

Generate a HIGH-QUALITY academic assessment paper.

The paper MUST:

1. Be professionally structured
2. Be suitable for real academic environments
3. Follow realistic examination standards
4. Strictly follow the requested question distribution
5. Maintain academic clarity and correctness
6. Avoid repetitive concepts or duplicate questions
7. Use proper subject-specific terminology
8. Match the requested question difficulties accurately
9. Maintain proper grammar and formatting
10. Use the uploaded reference material whenever relevant
11. Ensure marks align with expected answer complexity
12. Ensure higher-mark questions require deeper reasoning

==================================================
QUESTION QUALITY RULES
==================================================

Questions should test:
- conceptual understanding
- analytical thinking
- application-based reasoning
- problem-solving ability
- theoretical knowledge

Avoid:
- vague wording
- repeated concepts
- overly simplistic questions
- trivial distractors in MCQs
- ambiguous phrasing

Questions must feel like:
- real exam questions
- university assessments
- school examination papers
- professional classroom evaluations

==================================================
SECTION ORGANIZATION RULES
==================================================

Group questions into logical sections based on question type.

Example:
- Section A → MCQs
- Section B → Short Questions
- Section C → Long Questions
- Section D → Diagram Questions

Each section MUST contain:
- title
- instruction
- questions array

Sections should feel professionally organized like real examination papers.

==================================================
MCQ RULES
==================================================

For MCQ questions:
- Include exactly 4 options
- Include exactly 1 correct answer
- Ensure options are realistic
- Avoid obviously incorrect distractors
- Ensure conceptual quality

==================================================
TRUE/FALSE RULES
==================================================

For true-false questions:
- Include answer field
- Statements should require actual understanding
- Avoid extremely obvious statements

==================================================
SHORT QUESTION RULES
==================================================

For short questions:
- Keep answers concise but conceptual
- Test core understanding
- Match marks appropriately

==================================================
LONG QUESTION RULES
==================================================

For long-answer questions:
- Require explanation, derivation, analysis, or reasoning
- Require deeper understanding
- Justify higher marks allocation
- Encourage structured answers

==================================================
DIAGRAM QUESTION RULES
==================================================

For diagram-based questions:
- Ask students to draw, label, explain, or analyze diagrams
- Use academic diagram-oriented wording
- Focus on conceptual visualization

==================================================
DIFFICULTY RULES
==================================================

easy:
- basic conceptual understanding
- definitions
- simple applications

medium:
- analytical thinking
- moderate application
- conceptual reasoning

hard:
- deep analysis
- multi-step reasoning
- advanced application
- derivations/problem-solving

==================================================
STRICT OUTPUT RULES
==================================================

1. Return ONLY valid JSON
2. Do NOT return markdown
3. Do NOT include explanations
4. Do NOT include comments
5. Do NOT include trailing commas
6. Ensure JSON is parsable
7. Ensure all required fields are present
8. Do NOT include any text outside JSON

==================================================
VALID VALUES
==================================================

difficulty:
- easy
- medium
- hard

question types:
- mcq
- short
- long
- true-false
- diagram

==================================================
REQUIRED JSON FORMAT
==================================================

{
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions",
      "questions": [
        {
          "question": "What is process scheduling?",
          "difficulty": "easy",
          "marks": 2,
          "type": "short",
          "options": [],
          "answer": ""
        }
      ]
    }
  ]
}
`;

  let completion;

  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324",

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

      console.log(`Retrying AI request... Attempt ${attempt}`);

      await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
    }
  }

  const response = completion?.choices?.[0]?.message?.content;

  if (!response) {
    throw new Error("No response received from OpenRouter");
  }

  const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(cleanedResponse);
  } catch {
    console.error(cleanedResponse);

    throw new Error("Failed to parse AI JSON response");
  }

  const validatedResponse = generatedPaperZodSchema.parse(parsedResponse);

  return {
    validatedResponse,

    rawResponse: cleanedResponse,
  };
}
