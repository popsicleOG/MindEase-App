const axios = require("axios");

async function simpleTest() {
  try {
    console.log("🔍 Simple server test...");

    // Test if server is responding
    const response = await axios.post(
      "http://localhost:5000/register",
      {
        email: "test@example.com",
        password: "test123",
      },
      {
        timeout: 5000,
      },
    );

    console.log("✅ Server is responding!");
    console.log("Response:", response.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      console.log("❌ Server is not running on port 5000");
      console.log("💡 Start the server with: node index.js");
    } else if (error.response) {
      console.log("✅ Server is running!");
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    } else {
      console.log("❌ Error:", error.message);
    }
  }
}

simpleTest();
