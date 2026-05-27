import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    marks: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      enum: ["short-answer", "long-answer", "mcq", "true-false", "diagram"],
      required: true,
    },

    options: {
      type: [String],
      default: [],
    },

    answer: {
      type: String,
      default: "",
    },
  },

  { _id: false },
);

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    instruction: {
      type: String,
      default: "",
      trim: true,
    },

    questions: {
      type: [questionSchema],
      required: true,
      default: [],
    },
  },
  { _id: false },
);

export const generatedPaperSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    sections: {
      type: [sectionSchema],
      required: true,
      default: [],
    },

    aiRawResponse: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const GeneratedPaper = mongoose.model(
  "GeneratedPaper",
  generatedPaperSchema,
);
