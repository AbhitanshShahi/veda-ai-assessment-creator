import { Queue } from "bullmq";
import { Redis } from "ioredis";
import { redisConnectionOptions } from "../lib/redis.js";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("REDIS_URL is missing in your environment configuration.");
}

const queueRedisConnection = new Redis(redisUrl, redisConnectionOptions);

export const assignmentQueue = new Queue("generate-assignment", {
  connection: queueRedisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: {
      age: 3600,
      count: 100,
    },
    removeOnFail: false,
  },
});
