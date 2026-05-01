const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Homepage
app.get("/", (req, res) => {
  res.send("Server is running successfully on Render!");
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "App is healthy"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});