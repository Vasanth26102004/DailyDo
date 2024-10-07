import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Check if token exists
    const token = req.cookies["jwt-dailydo"];
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    // Ensure the decoded token has a valid userId
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
    }

    // Find user by decoded userId and exclude password field
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach user object to the request
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
