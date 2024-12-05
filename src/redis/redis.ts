import { createClient } from "redis";
import config from "config";

//
let redisClient : any;
/**
 *
 */
export const setUpRedisClient = async () => {
  redisClient = createClient({
    url: config.get("REDISCLOUD_URL"),
  });

  redisClient.on("error", (err : any) =>
    console.error("Redis Client Error", err)
  );
  //
  redisClient.on("connect", () => {
    console.log("Connected to Redis");
  });

  //
  await redisClient.connect();
};

/**
 *
 * @returns
 */
export const getRedisInstance = () => {
  if (!redisClient) {
    throw new Error("Redis Server not initialized");
  }

  return redisClient;
};
