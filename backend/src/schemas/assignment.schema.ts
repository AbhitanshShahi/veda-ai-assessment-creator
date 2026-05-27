import { z } from "zod";

export const createAssignmentSchema = z.object({
  title: z.string().min(1),
  subject: z.string().min(1),
  dueDate: z
    .string()
    .min(1)
    .transform((val) => new Date(val)),
  questionCount: z.number().min(1),
  totalMarks: z.number().min(1),
  questionTypes: z.array(
    z.object({
      type: z.string(),

      questions: z.number(),

      marks: z.number(),

      difficulty: z.enum(["easy", "medium", "hard"]),
    }),
  ),
  additionalInstructions: z.string().optional(),
  uploadedFileUrl: z.string().optional().default(""),
  uploadedFileName: z.string().optional().default(""),
  uploadedFileType: z.enum(["pdf", "docx", "txt"]).optional().default("pdf"),
  uploadedFileMimeType: z.string().optional(),
  uploadedFileSize: z.number().optional(),
});
