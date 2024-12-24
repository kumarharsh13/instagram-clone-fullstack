require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const app = express();


// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // React app origin (make sure this is correct)
    credentials: true,  // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allow these headers
  })
);

app.use(express.json());
app.use(cookieParser()); 


app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
