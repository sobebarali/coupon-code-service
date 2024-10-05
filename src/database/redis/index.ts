import config from "@src/config";
import { createClient, RedisClientType } from "redis";
import Logging from "@src/library/logging";

let redisClient: RedisClientType | null = null;

const connectRedis = async (): Promise<RedisClientType> => {
  // If the client already exists, return the cached version
  if (redisClient) {
    return redisClient;
  }

  const client = createClient({
    url: config.REDIS_DATABASE_URL as string,
    // Optional: retry_strategy to handle reconnection logic
    socket: {
      reconnectStrategy: (retries) => {
        if (retries >= 10) {
          Logging.error("Redis: Max reconnection attempts reached. Exiting.");
          return new Error("Max reconnection attempts reached.");
        }
        return Math.min(retries * 100, 3000); // Exponential backoff
      },
    },
  });

  client.on("error", (err) => {
    Logging.error(`Redis Client Error: ${err}`);
  });

  client.on("connect", () => {
    Logging.log("Redis Connected");
  });

  client.on("reconnecting", () => {
    Logging.log("Redis Reconnecting...");
  });

  try {
    await client.connect();
    redisClient = client as RedisClientType;
    Logging.log("Redis connection established and cached.");
    return redisClient;
  } catch (error) {
    Logging.error(
      `Redis Connection Error: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
};

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error("Redis client not initialized. Call connectRedis first.");
  }
  return redisClient;
};

export default connectRedis;
