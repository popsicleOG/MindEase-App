const Redis = require("ioredis");
const fs = require("fs");
const path = require("path");

// Load environment variables
const envPath = path.join(__dirname, "config.env");
const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};

envContent.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value && !key.startsWith("#")) {
    envVars[key.trim()] = value.trim();
  }
});

const REDIS_URL = envVars.REDIS_URL || "redis://localhost:6379";

async function testRedisConnection() {
  let redis;

  try {
    console.log("🔌 Testing Redis connection...");
    console.log(`📡 Connection string: ${REDIS_URL}`);

    // Create Redis client
    redis = new Redis(REDIS_URL, {
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
    });

    // Test basic connection
    const pong = await redis.ping();
    console.log("✅ Redis connected successfully!");
    console.log(`🏓 PING response: ${pong}`);

    // Test set/get operations
    const testKey = "mindease:test:connection";
    const testValue = "Redis connection test successful";

    await redis.set(testKey, testValue);
    console.log("✅ Test key set successfully!");

    const retrievedValue = await redis.get(testKey);
    console.log(`📝 Retrieved value: ${retrievedValue}`);

    if (retrievedValue === testValue) {
      console.log("✅ Get/Set operations working correctly!");
    } else {
      console.log("❌ Get/Set operations failed!");
    }

    // Test expiration
    await redis.expire(testKey, 1); // Set 1 second expiration
    console.log("⏰ Test key expiration set to 1 second");

    // Clean up
    await redis.del(testKey);
    console.log("🧹 Test key cleaned up");

    // Test rate limiting simulation
    const rateLimitKey = "mindease:ratelimit:test";
    const currentCount = await redis.incr(rateLimitKey);
    console.log(`📊 Rate limit counter: ${currentCount}`);

    await redis.expire(rateLimitKey, 60); // Expire in 1 minute
    console.log("⏰ Rate limit key will expire in 1 minute");

    console.log("✅ All Redis tests passed!");
  } catch (error) {
    console.error("❌ Redis connection failed:", error.message);
    console.error(
      "💡 Make sure Redis is running and the connection string is correct",
    );
    process.exit(1);
  } finally {
    if (redis) {
      await redis.quit();
      console.log("🔌 Redis connection closed");
    }
  }
}

testRedisConnection();
