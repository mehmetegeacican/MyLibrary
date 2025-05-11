const redis = require('redis');

//Connect to Redis
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
        return true;
    } catch (err) {
        console.error('Redis connection error:', err);
        return false;
    }
};

const closeRedis = async () => {
    try {
        await redisClient.quit();
        console.log('Redis connection closed');
    } catch (err) {
        console.error('Error closing Redis connection:', err);
    }
};

const getCache = async (key, id = null) => {
    let isConnected = false;
    try {
        isConnected = await connectRedis();
        console.log(isConnected, "Is Connected : ", isConnected);
        if (isConnected) {
            const cacheKey = id ? `${key}:${id}` : key;
            console.log("Cache key is :", cacheKey);
            const cacheValue = await redisClient.get(cacheKey);
            if (cacheValue) {
                return JSON.parse(cacheValue);
            }
        }
    } catch (err) {
        console.error("Error getting cache:", err);
    } finally {
        if (isConnected) {
            await closeRedis();
        }
        return;
    }
};

const setCache = async (key, value, id = null) => {
    let isConnected = false;
    try {
        isConnected = await connectRedis();
        if (isConnected) {
            const cacheKey = id ? `${key}:${id}` : key;
            await redisClient.set(cacheKey, JSON.stringify(value), { EX: 3600 });
            console.log(`Cache set for key: ${cacheKey}`);
        }
    } catch (err) {
        console.error("Error setting cache:", err);
    } finally {
        if (isConnected) {
            await closeRedis();
        }
    }
};

// Primary Redis Function for clearing Cache
const clearCache = async (key, id = null) => {
    let isConnected = false;
    try {
        isConnected = await connectRedis();
        if (isConnected) {
            const cacheKey = id ? `${key}:${id}` : key;
            await redisClient.del(cacheKey);
            console.log(`Cache cleared for key: ${cacheKey}`);
        }
    } catch (err) {
        console.error("Error clearing cache:", err)
    }
    finally {
        if (isConnected) {
            await closeRedis();
        }
    }
};

module.exports = {
    getCache,
    setCache,
    clearCache
}