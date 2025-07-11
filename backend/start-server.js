#!/usr/bin/env node

const { spawn } = require("child_process");
const net = require("net");

const PORT = process.env.PORT || 5000;

// Check if port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close();
      resolve(false);
    });
    server.on("error", () => {
      resolve(true);
    });
  });
}

// Kill process by PID
function killProcess(pid) {
  return new Promise((resolve) => {
    const kill = spawn("taskkill", ["/F", "/PID", pid.toString()], {
      shell: true,
    });
    kill.on("close", (code) => {
      resolve(code === 0);
    });
  });
}

// Find and kill process using port
async function killProcessOnPort(port) {
  return new Promise((resolve) => {
    const find = spawn("netstat", ["-ano"], { shell: true });
    let output = "";

    find.stdout.on("data", (data) => {
      output += data.toString();
    });

    find.on("close", async () => {
      const lines = output.split("\n");
      for (const line of lines) {
        if (line.includes(`:${port}`) && line.includes("LISTENING")) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && !isNaN(pid)) {
            console.log(
              `🔄 Found process ${pid} using port ${port}, killing it...`,
            );
            await killProcess(pid);
            resolve(true);
            return;
          }
        }
      }
      resolve(false);
    });
  });
}

// Start the server
async function startServer() {
  console.log("🚀 Starting MindEase Backend Server...");

  // Check if port is in use
  if (await isPortInUse(PORT)) {
    console.log(`⚠️  Port ${PORT} is already in use`);
    const killed = await killProcessOnPort(PORT);
    if (killed) {
      console.log("✅ Killed existing process");
      // Wait a moment for port to be released
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      console.log("❌ Could not kill existing process");
      console.log("💡 Manual steps:");
      console.log(`   1. netstat -ano | findstr :${PORT}`);
      console.log("   2. taskkill /F /PID <PID>");
      process.exit(1);
    }
  }

  // Start the main server
  const server = spawn("node", ["index.js"], {
    stdio: "inherit",
    shell: true,
  });

  server.on("error", (error) => {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  });

  server.on("close", (code) => {
    if (code !== 0) {
      console.error(`❌ Server exited with code ${code}`);
      process.exit(code);
    }
  });

  // Handle process termination
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down server...");
    server.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    console.log("\n🛑 Shutting down server...");
    server.kill("SIGTERM");
  });
}

startServer().catch((error) => {
  console.error("❌ Startup error:", error);
  process.exit(1);
});
