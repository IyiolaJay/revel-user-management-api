import { getRedisInstance } from "./redis";

/**
 *
 * @param {*} param0
 * @returns
 */
export const cacheData = async ({
  key,
  value,
  exp,
}: {
  key: string;
  value: string;
  exp?: number; // `exp` is optional since it may not always be provided
}) => {
  const cacheInstance = getRedisInstance();
  if (exp) {
    await cacheInstance.setEx(key, exp, value);
    return;
  }

  await cacheInstance.set(key, value);
  return;
};

/**
 *
 * @param {*} key
 * @returns
 */
export const getCacheData = async (key: string) => {
  const cacheInstance = getRedisInstance();
  return cacheInstance.get(key);
};

/**
 *
 * @param {*} key
 * @returns
 */
export const delCacheData = async (key: string) => {
  const cacheInstance = getRedisInstance();
  cacheInstance.del(key);
  return;
};
