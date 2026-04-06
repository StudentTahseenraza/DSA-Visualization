const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();




// =====================
// APP INITIALIZATION
// =====================
const app = express();
const PORT = process.env.PORT || 5000;

// =====================
// ENVIRONMENT CHECK
// =====================
console.log("🔧 Environment check:");
console.log("📁 NODE_ENV:", process.env.NODE_ENV || "development");
console.log("🔗 MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not set");
console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Not set");

// =====================
// MONGODB CONNECTION
// =====================
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("⚠️ MONGODB_URI not found in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
    console.log("📊 Database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // ❗ stop server if DB fails
  }
};

connectDB();

// =====================
// MIDDLEWARES
// =====================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "https://dsa-visualization-two.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-auth-token"
  ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// REQUEST LOGGER
// =====================
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// =====================
// ROUTES (🔥 FIXED PART)
// =====================

// DSA / Algorithm routes
const algorithmRoutes = require("./routes"); // routes/index.js

// Auth routes
const authRoutes = require("./routes/authRoutes");

// Register routes
app.use("/api", algorithmRoutes);
app.use("/api/auth", authRoutes);

console.log("✅ All routes loaded successfully");

// =====================
// HEALTH CHECK
// =====================
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    mongodb:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.originalUrl
  });
});

// =====================
// GLOBAL ERROR HANDLER
// =====================
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);

  res.status(err.status || 500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development" ? err.message : undefined
  });
});


// =====================
// START SERVER
// =====================
app.listen(PORT, () => {
  
  console.log(`
🚀 Server running successfully
────────────────────────────────
📡 Port: ${PORT}
🌍 URL: http://localhost:${PORT}
📊 Health: http://localhost:${PORT}/api/health
🔐 Auth Test: http://localhost:${PORT}/api/auth/test
────────────────────────────────
`);
});
