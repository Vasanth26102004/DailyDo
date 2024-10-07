import express from "express";
import bcryptjs from 'bcryptjs';  // Corrected bcryptjs import
import User from '../models/userModel.js';
import { generateToken } from "../config/auth.js";

const router = express.Router();
const saltRounds = 10;

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        errors: "User already exists with this email address",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to DB
    await user.save();

    // Generate token
    const token = generateToken({ id: user._id });

    res.json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: "No user found with this email address",
      });
    }

    // Compare passwords
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, errors: "Invalid password" });
    }

    // Generate token
    const token = generateToken({ id: user._id });

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;  // Use export default for ES6 modules
