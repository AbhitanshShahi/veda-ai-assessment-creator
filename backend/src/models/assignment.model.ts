import mongoose from "mongoose";

export interface Assignment {
  _id?: mongoose.Types.ObjectId;
  title: string;
  subject: string;
  dueDate: Date;
  questionCount: number;
  totalMarks: number;
  questionTypes: {
    type: string;
    questions: number;
    marks: number;
    difficulty: "easy" | "medium" | "hard";
  }[];
  additionalInstructions?: string;
  uploadedFileUrl?: string;
  uploadedFileName?: string;
  uploadedFileType?: "pdf" | "docx" | "text";
  uploadedFileMimeType?: string;
  uploadedFileSize?: number;
  extractedText?: string;
  status: "queued" | "processing" | "completed" | "failed";
  generatedPaperId?: mongoose.Types.ObjectId;
  generationError?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: mongoose.Types.ObjectId;
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

    questionTypes: [
      {
        type: {
          type: String,
          required: true,
        },

        questions: {
          type: Number,
          required: true,
        },

        marks: {
          type: Number,
          required: true,
        },

        difficulty: {
          type: String,
          enum: ["easy", "medium", "hard"],
          required: true,
        },
      },
    ],

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
    extractedText: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const AssignmentModel = mongoose.model<Assignment>(
  "Assignment",
  assignmentSchema,
);
