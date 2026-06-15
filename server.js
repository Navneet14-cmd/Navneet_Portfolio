import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import { sendTelegramNotification } from "./utils/telegram.js";

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for cross-origin deployments (e.g., frontend on Vercel/Netlify, backend on Render)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("CRITICAL ERROR: MONGODB_URI is not set in environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDB database."))
  .catch((err) => console.error("MongoDB connection exception:", err));

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
    // 2. Save first (keeps lead even if Telegram API is down)
    const requestDoc = new HireRequest({ name, email, proposal });
    await requestDoc.save();

    // 3. Notify second (triggers background notification)
    const notificationSuccess = await sendTelegramNotification({ name, email, proposal });
    
    if (notificationSuccess) {
      requestDoc.telegramSent = true;
      await requestDoc.save();
    }

    return res.status(201).json({
      success: true,
      message: "Proposal crafted and dispatched successfully!"
    });
  } catch (err) {
    console.error("Error processing proposal submit:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server validation block. Failed to save contract proposal."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Express server listening on port ${PORT}`);
});
