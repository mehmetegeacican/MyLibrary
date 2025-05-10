const redis = require('redis');

//Connect to Redis
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
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

// Primary Redis Functions for Caching
const getCache = async (key, id = null) => {
    try {
        await connectRedis();  
        const cacheKey = id ? `${key}:${id}` : key;
        console.log("Cache key is :" , cacheKey);
        const cacheValue = await redisClient.get(cacheKey);
        if (cacheValue) {
            return JSON.parse(cacheValue);
        } else {
            return null;
        }
    } catch(err){
        console.error("Error getting cache:", err)
    }
    finally {
        await closeRedis();
    }
}

//  Primary Redis Function for Setting Cache
const setCache = async (key, value, id = null) => {
    try {
        await connectRedis();  
        const cacheKey = id ? `${key}:${id}` : key;
        await redisClient.set(cacheKey, JSON.stringify(value), {EX: 3600});
        console.log(`Cache set for key: ${cacheKey}`);
    } catch(err){
        console.error("Error setting cache:", err)
    } finally {
        await closeRedis();
    }
}

module.exports = {
    getCache,
    setCache
}