const mongoose = require("mongoose");
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

const MONGO_URI = envVars.MONGO_URI || "mongodb://localhost:27017/mindease";

async function testMongoConnection() {
  try {
    console.log("🔌 Testing MongoDB connection...");
    console.log(`📡 Connection string: ${MONGO_URI}`);

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully!");

    // Test creating a collection
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(
      "📚 Available collections:",
      collections.map((c) => c.name),
    );

    // Test creating a test document
    const testCollection = db.collection("test");
    await testCollection.insertOne({
      message: "MongoDB connection test successful",
      timestamp: new Date(),
    });
    console.log("✅ Test document created successfully!");

    // Clean up test document
    await testCollection.deleteOne({
      message: "MongoDB connection test successful",
    });
    console.log("🧹 Test document cleaned up");

    // Close connection
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

testMongoConnection();
