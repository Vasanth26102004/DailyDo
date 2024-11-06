import express from "express";
import cors from "cors";
import path from "path";
import multer from 'multer';

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
  cors()
);

// Database connection
connectDB();

// Routes
app.use("/task", taskRoutes);
app.use("/auth", userRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to the API");
});


// Create Upload Destination
const upload = multer({ dest:'upload/' });

app.post('/api/image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    success: 1,
    file: req.file,
    message: "File uploaded successfully",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
