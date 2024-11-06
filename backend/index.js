import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";

import { ENV_VARS } from "./config/envVars.js";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = ENV_VARS.PORT || 3000;
ENV_VARS;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://daily-do-app.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    maxAge: 3600,
  })
);

// Database connection
connectDB();

// Routes
app.use("/task", taskRoutes);
app.use("/auth", userRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to the API");
});

// Image Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Create Upload Destination
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("user"), (req, res) => {
  res.json({
    success: 1,
    image_url: `https://daily-do-server.vercel.app/images/${req.file.filename}`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
