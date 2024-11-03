import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import { ENV_VARS } from "./config/envVars.js";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = ENV_VARS.PORT || 3000;
const BASE_URL = ENV_VARS.BASE_URL || `http://localhost:${PORT}`;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ENV_VARS.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "user-id"],
    maxAge: 3600,
  })
);

// Database connection
connectDB().catch((err) => {
  console.error("Failed to connect to the database:", err);
  process.exit(1);
});

// Routes
app.use("/task", taskRoutes);
app.use("/auth", userRoutes);
app.get("/", (req, res) => res.send("Welcome to the API"));

// Resolve `__dirname` in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "upload/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Serve static files
app.use("/images", express.static(uploadDir));

// Image upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }
  res.json({
    success: 1,
    image_url: `${BASE_URL}/images/${req.file.filename}`,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: 0, message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
});
