
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === "production";

// Trust Render's HTTPS-terminating proxy in production.
if (isProduction) {
  app.set("trust proxy", 1);
}

// Required environment variables.
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is missing from environment variables.");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing from environment variables.");
}

app.use(helmet());

// Allow requests from the configured frontend origin.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

// General API rate limit.
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

// Basic health endpoints.
app.get("/", (req, res) => {
  res.status(200).send("Ethixweb API is running!");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ethixweb API is running",
    database: "connected",
  });
});

// Additional protection for administrator login attempts.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

const startServer = async () => {
  // Connect to MongoDB before accepting requests.
  await connectDB();

  // Persist sessions in MongoDB.
  const mongoose = (await import("mongoose")).default;

  const sessionStore = MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: "sessions",
    ttl: 14 * 24 * 60 * 60,
  });

  app.use(
    session({
      name: "ethixweb.sid",
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: isProduction,
        // Cross-site frontend/backend sessions need None over HTTPS.
        sameSite: isProduction ? "none" : "lax",
        maxAge: 14 * 24 * 60 * 60 * 1000,
        path: "/",
      },
    })
  );

  // Apply a stricter rate limit to login requests.
  app.use(
    "/api/auth",
    (req, res, next) => {
      if (req.path === "/login" && req.method === "POST") {
        return loginLimiter(req, res, next);
      }

      next();
    },
    authRoutes
  );

  // Application routes.
  app.use("/api/enquiries", enquiryRoutes);
  app.use("/api/admin", adminRoutes);

  app.listen(PORT, () => {
    console.log(`Ethixweb API listening on port ${PORT}`);
    console.log("MongoDB-backed sessions enabled.");
  });
};

startServer().catch((error) => {
  console.error("Failed to start Ethixweb API:", error.message);
  process.exit(1);
});
