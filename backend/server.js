import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = ENV_VARS.PORT || 3000;
ENV_VARS;
// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3001", // Your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));

// Database connection
connectDB();

// Routes
app.use("/task", taskRoutes);
app.use("/auth", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
