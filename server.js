import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import { sendTelegramNotification } from "./utils/telegram.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("CRITICAL ERROR: MONGODB_URI is not set in environment variables.");
  process.exit(1);
}

// Connect to MongoDB with a 5s timeout to avoid indefinite request hangs
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("Successfully connected to MongoDB database."))
  .catch((err) => console.error("MongoDB connection exception (check if cluster is paused in Atlas):", err.message));

// MongoDB schema matching frontend fields plus metadata delivery flag
const HireRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  proposal: { type: String, required: true },
  telegramSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const HireRequest = mongoose.model("HireRequest", HireRequestSchema);

// Configure rate limiting to prevent form spams
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: "Too many hire proposals submitted from this IP. Please try again in 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiter specifically to the submission route
app.use("/api/hire", limiter);

// POST API route
app.post("/api/hire", async (req, res) => {
  const { name, email, proposal } = req.body;

  // 1. Server-side Validation
  if (!name || !email || !proposal) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields. Name, email, and proposal details are mandatory."
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email format. Please provide a valid email address."
    });
  }

  try {
    let dbSaved = false;
    let requestDoc = null;

    // 2. Attempt saving to MongoDB
    try {
      requestDoc = new HireRequest({ name, email, proposal });
      await requestDoc.save();
      dbSaved = true;
      console.log("Proposal successfully saved to MongoDB.");
    } catch (dbErr) {
      console.error("MongoDB save skipped/failed (check if Atlas cluster is paused or needs resume):", dbErr.message);
    }

    // 3. Always dispatch Telegram notification so leads are never missed!
    const notificationSuccess = await sendTelegramNotification({ name, email, proposal });

    if (dbSaved && notificationSuccess && requestDoc) {
      try {
        requestDoc.telegramSent = true;
        await requestDoc.save();
      } catch (flagErr) {
        console.warn("Could not update telegramSent status in DB:", flagErr.message);
      }
    }

    // If Telegram succeeded OR MongoDB saved the document, return success!
    if (notificationSuccess || dbSaved) {
      return res.status(201).json({
        success: true,
        message: "Proposal crafted and dispatched successfully!",
        savedToDb: dbSaved,
        telegramSent: notificationSuccess
      });
    }

    // If both failed, notify client to try direct contact
    return res.status(500).json({
      success: false,
      error: "Failed to dispatch proposal redstone signal. Please reach out via email or LinkedIn."
    });
  } catch (err) {
    console.error("Unexpected error processing proposal submit:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error. Failed to craft contract proposal."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Express server listening on port ${PORT}`);
});
