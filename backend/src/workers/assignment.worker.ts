import { Worker } from "bullmq";

import { workerRedisConnection } from "../lib/redis.js";

import { AssignmentModel } from "../models/assignment.model.js";
import { GeneratedPaper } from "../models/generatedPaper.model.js";

import { generateAssignmentPaper } from "../services/ai.service.js";

import { io } from "../server.js";

export const assignmentWorker = new Worker(
  "generate-assignment",

  async (job) => {
    const { assignmentId } = job.data;

    try {
      const assignment = await AssignmentModel.findById(assignmentId);

      if (!assignment) {
        throw new Error("Assignment request document not found in database.");
      }

      assignment.status = "processing";

      await assignment.save();

      if (io) {
        io.to(assignmentId).emit("generation-started", {
          assignmentId,
          status: "processing",
        });

        io.to(assignmentId).emit("generation-progress", {
          assignmentId,
          step: "preparing-prompt",
          progress: 20,
        });
      }

      if (io) {
        io.to(assignmentId).emit("generation-progress", {
          assignmentId,
          step: "generating-questions",
          progress: 50,
        });
      }

      const { validatedResponse, rawResponse } = await generateAssignmentPaper({
        subject: assignment.subject,

        questionCount: assignment.questionCount,

        totalMarks: assignment.totalMarks,

        questionTypes: assignment.questionTypes,

        additionalInstructions: assignment.additionalInstructions || "",

        extractedText: assignment.extractedText || "",
      });

      if (io) {
        io.to(assignmentId).emit("generation-progress", {
          assignmentId,
          step: "validating-response",
          progress: 75,
        });
      }

      const generatedPaper = await GeneratedPaper.create({
        assignmentId: assignment._id,

        sections: validatedResponse.sections,

        aiRawResponse: rawResponse,
      });

      if (io) {
        io.to(assignmentId).emit("generation-progress", {
          assignmentId,
          step: "saving-paper",
          progress: 90,
        });
      }

      assignment.generatedPaperId = generatedPaper._id;

      assignment.status = "completed";

      assignment.generationError = "";

      await assignment.save();

      if (io) {
        io.to(assignmentId).emit("generation-completed", {
          assignmentId,
          status: "completed",

          progress: 100,

          generatedPaperId: generatedPaper._id,
        });
      }

      return {
        success: true,
      };
    } catch (error: unknown) {
      console.error(`Assignment generation failed for Job [${job.id}]:`, error);

      await AssignmentModel.findByIdAndUpdate(assignmentId, {
        status: "failed",

        generationError:
          error instanceof Error ? error.message : "Unknown Generation Failure",
      });

      if (io) {
        io.to(assignmentId).emit("generation-failed", {
          assignmentId,
          status: "failed",

          error:
            error instanceof Error
              ? error.message
              : "Unknown Generation Failure",
        });
      }

      throw error;
    }
  },

  {
    connection: workerRedisConnection,

    concurrency: 2,
  },
);

assignmentWorker.on("completed", (job) => {
  console.log(`Job ${job.id} processed successfully.`);
});

assignmentWorker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed processing loop:`, error.message);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`Cleaning background thread pools via ${signal}...`);

  await assignmentWorker.close();

  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
