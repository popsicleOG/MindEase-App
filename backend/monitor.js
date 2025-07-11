#!/usr/bin/env node

const http = require("http");
const { spawn } = require("child_process");

const PORT = process.env.PORT || 5000;
const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
const MAX_FAILURES = 3;

let failureCount = 0;
let serverProcess = null;

// Check server health
function checkHealth() {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${PORT}/health`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const health = JSON.parse(data);
          if (health.status === "OK") {
            console.log("✅ Server is healthy");
            failureCount = 0;
            resolve(true);
          } else {
            console.log("⚠️  Server health check failed");
            resolve(false);
          }
        } catch (error) {
          console.log("⚠️  Invalid health response");
          resolve(false);
        }
      });
    });

    req.on("error", (error) => {
      console.log(`❌ Health check failed: ${error.message}`);
      resolve(false);
    });

    req.setTimeout(5000, () => {
      console.log("⏰ Health check timeout");
      req.destroy();
      resolve(false);
    });
  });
}

// Start the server
function startServer() {
  console.log("🚀 Starting server...");
  serverProcess = spawn("node", ["index.js"], {
    stdio: "inherit",
    shell: true,
  });

  serverProcess.on("error", (error) => {
    console.error("❌ Failed to start server:", error);
  });

  serverProcess.on("close", (code) => {
    console.log(`❌ Server process exited with code ${code}`);
    serverProcess = null;
  });

  return serverProcess;
}

// Stop the server
function stopServer() {
  if (serverProcess) {
    console.log("🛑 Stopping server...");
    serverProcess.kill("SIGTERM");
    serverProcess = null;
  }
}

// Monitor the server
async function monitor() {
  console.log("🔍 Starting server monitor...");

  // Start initial health check
  const isHealthy = await checkHealth();
  if (!isHealthy) {
    console.log("⚠️  Server not responding, starting it...");
    startServer();
    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Set up periodic health checks
  setInterval(async () => {
    const isHealthy = await checkHealth();

    if (!isHealthy) {
      failureCount++;
      console.log(`⚠️  Health check failed (${failureCount}/${MAX_FAILURES})`);

      if (failureCount >= MAX_FAILURES) {
        console.log("❌ Too many failures, restarting server...");
        stopServer();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        startServer();
        failureCount = 0;
      }
    }
  }, HEALTH_CHECK_INTERVAL);

  // Handle process termination
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down monitor...");
    stopServer();
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    console.log("\n🛑 Shutting down monitor...");
    stopServer();
    process.exit(0);
  });
}

// Run the monitor
monitor().catch((error) => {
  console.error("❌ Monitor error:", error);
  process.exit(1);
});
