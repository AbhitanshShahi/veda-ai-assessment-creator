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
  difficulty: z.enum(["easy", "medium", "hard"]),
  questionTypes: z.array(z.string()),
  additionalInstructions: z.string().optional(),
  uploadedFileUrl: z.string().optional().default(""),
  uploadedFileName: z.string().optional().default(""),
  uploadedFileType: z.enum(["pdf", "docx", "txt"]).optional().default("pdf"),
  uploadedFileMimeType: z.string().optional(),
  uploadedFileSize: z.number().optional(),
});
