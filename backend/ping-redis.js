const redis = require("redis");

// Redis Cloud connection URI
const redisUrl =
  "redis://default:8eWyWxsVsnqcKypfXN7vofoX6ICUQomf@redis-19599.c60.us-west-1-2.ec2.redns.redis-cloud.com:19599";

(async () => {
  const client = redis.createClient({ url: redisUrl });
  client.on("error", (err) => console.error("Redis Client Error", err));

  try {
    await client.connect();
    await client.set("test-key", "connected");
    const value = await client.get("test-key");
    console.log("Successfully set test-key:", value);
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  } finally {
    await client.disconnect();
  }
})();
