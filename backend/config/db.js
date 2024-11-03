import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://vasanthp2610:vasanth2610@cluster0.h1wtv.mongodb.net/dailydo"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

