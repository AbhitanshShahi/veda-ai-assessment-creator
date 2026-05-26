import mongoose from "mongoose";

export const generatedPaperSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    sections: [
      {
        title: {
          type: String,
          required: true,
        },

        instruction: {
          type: String,
          default: "",
        },

        questions: [
          {
            question: {
              type: String,
              required: true,
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
              required: true,
            },
          },
        ],
      },
    ],

    aiRawResponse: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export const GeneratedPaper = mongoose.model("GeneratedPaper", generatedPaperSchema);
