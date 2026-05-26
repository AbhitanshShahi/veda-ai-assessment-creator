import { z } from "zod";

export const difficultyEnum = z.enum([
  "easy",
  "medium",
  "hard",
]);

export const questionTypeEnum = z.enum([
  "short-answer",
  "long-answer",
  "mcq",
  "true-false",
]);

const baseQuestionSchema = z.object({
  question: z
    .string()
    .min(1, "Question is required"),

  difficulty: difficultyEnum,

  marks: z
    .number()
    .min(1, "Marks must be at least 1"),
});

const mcqQuestionSchema =
  baseQuestionSchema.extend({
    type: z.literal("mcq"),

    options: z
      .array(z.string())
      .min(2, "MCQ requires at least 2 options"),

    answer: z
      .string()
      .min(1, "MCQ answer is required"),
  });

const normalQuestionSchema =
  baseQuestionSchema.extend({
    type: z.enum([
      "short-answer",
      "long-answer",
      "true-false",
    ]),
  });

export const generatedQuestionSchema =
  z.discriminatedUnion(
    "type",
    [
      mcqQuestionSchema,
      normalQuestionSchema,
    ],
  );

export const generatedSectionSchema =
  z.object({
    title: z
      .string()
      .min(
        1,
        "Section title is required",
      ),

    instruction: z.string(),

    questions: z
      .array(
        generatedQuestionSchema,
      )
      .min(
        1,
        "At least one question required",
      ),
  });

export const generatedPaperZodSchema =
  z.object({
    sections: z
      .array(
        generatedSectionSchema,
      )
      .min(
        1,
        "At least one section required",
      ),
  });

export type GeneratedPaperSchemaType =
  z.infer<
    typeof generatedPaperZodSchema
  >;