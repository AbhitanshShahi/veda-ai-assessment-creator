import mongoose from "mongoose";

export interface Assignment {
  _id?: mongoose.Types.ObjectId;
  title: string;
  subject: string;
  dueDate: Date;
  questionCount: number;
  totalMarks: number;
  difficulty: "easy" | "medium" | "hard";
  questionTypes: string[];
  additionalInstructions?: string;
  uploadedFileUrl?: string;
  uploadedFileName?: string;
  uploadedFileType?: "pdf"| "docx" | "text";
  uploadedFileMimeType?: string;
  uploadedFileSize?: number;
  status: "queued" | "processing" | "completed" | "failed";
  generatedPaperId?: mongoose.Types.ObjectId;
  generationError?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const assignmentSchema = new mongoose.Schema<Assignment>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    questionCount: {
      type: Number,
      required: true,
      min: 1,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"] as const,
      required: true,
    },

    questionTypes: {
      type: [String],
      default: [],
    },

    additionalInstructions: {
      type: String,
      default: "",
      trim: true,
    },

    uploadedFileUrl: {
      type: String,
      default: "",
    },

    uploadedFileName: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["queued", "processing", "completed", "failed"],
      default: "queued",
    },

    generatedPaperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedPaper",
      default: null,
    },

    generationError: {
      type: String,
      default: "",
    },
    uploadedFileType: {
      type: String,
      enum: ["pdf", "docx", "text"] as const,
      default: undefined,
    },

    uploadedFileMimeType: {
      type: String,
      default: "",
    },

    uploadedFileSize: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const AssignmentModel = mongoose.model<Assignment>(
  "Assignment",
  assignmentSchema,
);
