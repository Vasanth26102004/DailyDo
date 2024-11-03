import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";
const connectDB = async () => {
  try {
    mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};
export default connectDB;