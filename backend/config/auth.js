import jwt from "jsonwebtoken";
import { ENV_VARS } from "./envVars.js";

/**
 * Generates a JSON Web Token (JWT) for the given data.
 * 
 * @param {object} data - The data to be encoded in the JWT.
 * @returns {string} The generated JWT.
 */
const generateToken = (data) => {
  return jwt.sign(data, ENV_VARS.JWT_SECRET, { expiresIn: "30m" });
};

// Use ES Module export
export { generateToken };