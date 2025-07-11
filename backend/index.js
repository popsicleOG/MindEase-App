const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const Redis = require("ioredis");
const fs = require("fs");
const path = require("path");
const { User } = require("./models");
const moodRoutes = require("./moodRoutes");
const paymentRoutes = require("./paymentRoutes");
const userRoutes = require("./userRoutes");
const goalRoutes = require("./goalRoutes");
const { authenticateToken } = require("./authMiddleware");
const { 
  logger, 
  requestLogger, 
  performanceMonitor, 
  errorMonitor, 
  healthCheck, 
  getMetrics 
} = require("./middleware/monitoring");

// Global error handler for uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", { error: err.message, stack: err.stack });
  console.error("❌ Uncaught Exception:", err);
  console.error("Stack trace:", err.stack);
  process.exit(1);
});

// Global error handler for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection", { reason: reason, promise: promise });
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Graceful shutdown handler
let server; // Declare server variable globally

process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully...");
  if (server) {
    server.close(() => {
      console.log("✅ Server closed");
      mongoose.connection.close(() => {
        console.log("✅ Database connection closed");
        process.exit(0);
      });
    });
  } else {
    process.exit(0);
  }
});

process.on("SIGINT", () => {
  console.log("🛑 SIGINT received, shutting down gracefully...");
  if (server) {
    server.close(() => {
      console.log("✅ Server closed");
      mongoose.connection.close(() => {
        console.log("✅ Database connection closed");
        process.exit(0);
      });
    });
  } else {
    process.exit(0);
  }
});

// Load environment variables
const envPath = path.join(__dirname, "config.env");
let envContent = "";
try {
  envContent = fs.readFileSync(envPath, "utf8");
} catch (error) {
  console.error("❌ Error reading config.env:", error.message);
  console.log("⚠️  Using default environment variables");
}

const envVars = {};

if (envContent) {
  envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value && !key.startsWith("#")) {
      envVars[key.trim()] = value.trim();
    }
  });
}

// Set environment variables
Object.keys(envVars).forEach((key) => {
  process.env[key] = envVars[key];
});

const app = express();

// Initialize Redis client with error handling
let redisClient;
try {
  redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true, // Don't connect immediately
  });

  redisClient.on("error", (err) => {
    console.log(
      "⚠️  Redis connection error (continuing without Redis):",
      err.message,
    );
  });

  redisClient.on("connect", () => {
    console.log("✅ Connected to Redis");
  });
} catch (error) {
  console.log(
    "⚠️  Redis initialization failed (continuing without Redis):",
    error.message,
  );
  redisClient = null;
}

app.use(helmet());

// CORS configuration with preflight support
app.use(
  cors({
    origin: "*", // Allow all origins for local testing
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// Handle preflight requests explicitly
app.options("*", cors());

// Custom fallback for OPTIONS preflight
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With",
    );
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Enhanced logging and monitoring middleware
app.use(requestLogger);
app.use(performanceMonitor);

// Simplified rate limiting without Redis for now
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many payment requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/payment/webhook", express.raw({ type: "application/json" }));

// Enhanced health check and metrics endpoints
app.get("/health", healthCheck);
app.get("/metrics", getMetrics);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "MindEase API is running",
    version: "1.0.0",
    endpoints: {
      auth: "/auth",
      health: "/health",
      user: "/user",
      mood: "/mood",
      payment: "/payment",
      suggestions: "/suggestions",
    },
  });
});

// Connect to MongoDB with retry logic
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(
        process.env.MONGO_URI || "mongodb://localhost/mindease",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        },
      );
      console.log("✅ Connected to MongoDB");
      return;
    } catch (err) {
      console.error(
        `❌ MongoDB connection attempt ${i + 1} failed:`,
        err.message,
      );
      if (i === retries - 1) {
        console.error("❌ Failed to connect to MongoDB after all retries");
        process.exit(1);
      }
      console.log(`⏳ Retrying in 5 seconds...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

// Start server function
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });

    // Handle server errors
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use`);
        console.log("💡 Try:");
        console.log(`   netstat -ano | findstr :${PORT}`);
        console.log(`   taskkill /F /PID <PID>`);
        process.exit(1);
      } else {
        console.error("❌ Server error:", err);
        process.exit(1);
      }
    });

    return server;
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

app.post("/auth", loginLimiter, async (req, res) => {
  try {
    const { email, password, isRegistering } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    if (isRegistering) {
      // Handle registration
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } else {
      // Handle login
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ token, subscriptionStatus: user.subscriptionStatus });
    }
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ error: "Server error during authentication" });
  }
});

app.post("/register", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

app.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ token, subscriptionStatus: user.subscriptionStatus });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

app.use("/user", userRoutes);
app.use("/mood", moodRoutes);
app.use("/goals", goalRoutes);
app.use("/payment", paymentLimiter, paymentRoutes);

// Error monitoring middleware (must be last)
app.use(errorMonitor);

// Start the server
startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});
