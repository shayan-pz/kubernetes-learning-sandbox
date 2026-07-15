const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const PYTHON_SERVICE_URL =
  process.env.PYTHON_SERVICE_URL || "http://python-service:5000";

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from Node.js API" });
});

app.get(["/process", "/api/process"], async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_SERVICE_URL}/process`);

    res.json({
      status: "success",
      fromNode: "Node.js received response from Python",
      pythonResponse: response.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to call Python service",
      error: error.message,
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Node.js API running on port ${PORT}`);
});
