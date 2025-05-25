import { createClient } from 'redis';

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('Connected to Redis');
    }
    return true;
  } catch (err) {
    console.error('Redis connection error:', err);
    return false;
  }
};

const closeRedis = async () => {
  try {
    if (redisClient.isOpen) {
      await redisClient.quit();
      console.log('Redis connection closed');
    }
  } catch (err) {
    console.error('Error closing Redis connection:', err);
  }
};

export const getCache = async (key: string, id: string | null = null) => {
  let isConnected = false;
  try {
    isConnected = await connectRedis();
    if (isConnected) {
      const cacheKey = id ? `${key}:${id}` : key;
      const cacheValue = await redisClient.get(cacheKey);
      if (cacheValue) {
        return JSON.parse(cacheValue);
      }
    }
  } catch (err) {
    console.error('Error getting cache:', err);
  } finally {
    if (isConnected) {
      await closeRedis();
    }
    return;
  }
};

export const setCache = async (key: string, value: any, id: string | null = null) => {
  let isConnected = false;
  try {
    isConnected = await connectRedis();
    if (isConnected) {
      const cacheKey = id ? `${key}:${id}` : key;
      await redisClient.set(cacheKey, JSON.stringify(value), { EX: 3600 });
      console.log(`Cache set for key: ${cacheKey}`);
    }
  } catch (err) {
    console.error('Error setting cache:', err);
  } finally {
    if (isConnected) {
      await closeRedis();
    }
  }
};

export const clearCache = async (key: string, id: string | null = null) => {
  let isConnected = false;
  try {
    isConnected = await connectRedis();
    if (isConnected) {
      const cacheKey = id ? `${key}:${id}` : key;
      await redisClient.del(cacheKey);
      console.log(`Cache cleared for key: ${cacheKey}`);
    }
  } catch (err) {
    console.error('Error clearing cache:', err);
  } finally {
    if (isConnected) {
      await closeRedis();
    }
  }
};