import { Worker } from "bullmq";
import { Redis } from "ioredis";
import { redisConnectionOptions } from "../lib/redis.js";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("❌ REDIS_URL is missing in your environment configuration.");
}

const workerRedisConnection = new Redis(redisUrl, redisConnectionOptions);

export const assignmentWorker = new Worker(
  "generate-assignment",
  async (job) => {
    console.log("=================================");
    console.log("New Job Received");
    console.log("Job ID:", job.id);
    console.log("Job Data:", job.data);
    console.log("=================================");

    try {
      console.log("Processing assignment generation...");

      // Simulate AI Processing
      await new Promise((resolve) => setTimeout(resolve, 5000));

      console.log("Assignment generated successfully");

      return {
        success: true,
        generatedAt: new Date(),
      };
    } catch (error) {
      console.error("Worker Processing Failed:", error);
      throw error;
    }
  },
  {
    connection: workerRedisConnection,
    concurrency: 5, // Processes up to 5 jobs concurrently
  }
);

// Event Listeners
assignmentWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

assignmentWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

assignmentWorker.on("error", (err) => {
  console.error("Worker Core Error:", err);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}, closing assignment worker`);
  await assignmentWorker.close();
  await workerRedisConnection.quit();
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));