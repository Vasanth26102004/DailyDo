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
  origin: 'https://daily-do-app.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
