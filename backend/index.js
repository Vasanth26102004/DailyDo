import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { ENV_VARS } from "./config/envVars.js";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = ENV_VARS.PORT || 3000;
ENV_VARS;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://daily-do-app.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type','Authorization','user-id'],
  maxAge: 3600,
}));

// Database connection
connectDB();

// Routes
app.use("/task", taskRoutes);
app.use("/auth", userRoutes);
app.use("/", 
  (req, res) => {
    res.send("Welcome to the API");
    }
);

// Create `__dirname` in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage with simplified options
const storage = multer.diskStorage({
  destination: path.join(__dirname, "upload/images"), // Use the resolved `__dirname`
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve static files from the upload directory
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// Image upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`, // Localhost URL for testing
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});