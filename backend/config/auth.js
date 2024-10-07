import jwt from "jsonwebtoken";
import { ENV_VARS } from "./envVars.js"; // Corrected the import statement

const generateToken = (data) => {
  return jwt.sign(data, ENV_VARS.JWT_SECRET, { expiresIn: "30m" });
};

// Use ES Module export
export { generateToken };
