require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Import routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies from the client

// Use authRoutes for authentication endpoints
app.use("/api/auth", authRoutes); // All routes in authRoutes.js are prefixed with /api/auth

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
