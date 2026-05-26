import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("Error: REDIS_URL is not defined in your environmental variables!");
  process.exit(1);
}

export const redisConnectionOptions = {
  maxRetriesPerRequest: null, 
};

const redisClient = new Redis(redisUrl, redisConnectionOptions);

redisClient.on("connect", () => {
  console.log("Redis Connected Successfully...");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export default redisClient;