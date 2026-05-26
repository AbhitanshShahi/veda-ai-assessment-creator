import { Redis } from "ioredis";
import type { RedisOptions } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("❌ REDIS_URL is missing in environment variables");
  process.exit(1);
}

export const redisConnectionOptions: RedisOptions = {
  maxRetriesPerRequest: null,
  ...(redisUrl.startsWith("rediss://")
    ? { tls: { rejectUnauthorized: false } }
    : {}),
};

export const redisClient = new Redis(redisUrl, redisConnectionOptions);

export const queueRedisConnection = new Redis(redisUrl, redisConnectionOptions);

export const workerRedisConnection = new Redis(
  redisUrl,
  redisConnectionOptions,
);

redisClient.on("connect", () => {
  console.log("Redis general client connected...");
});
redisClient.on("error", (err) => {
  console.error("Redis general client error:", err);
});

queueRedisConnection.on("connect", () => {
  console.log("BullMQ Queue Redis connection established...");
});
queueRedisConnection.on("error", (err) => {
  console.error("BullMQ Queue Redis error:", err);
});

workerRedisConnection.on("connect", () => {
  console.log("BullMQ Worker Redis connection established...");
});
workerRedisConnection.on("error", (err) => {
  console.error("BullMQ Worker Redis error:", err);
});

export default redisClient;
