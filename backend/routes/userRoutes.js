import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../config/auth.js";

const router = express.Router();
const saltRounds = 10;

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log( username, email, password);
    let user;
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        errors: "User already exists with this email address",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    user = new User({
      name: username,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = generateToken(data);
    console.log(token)
    res.json({ success: true, token, user });
 
}catch (error) {
  res.status(500).json({ message: "Server Error", error });
}
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        errors: "No user found with this email address",
      });
    } 
    console.log(bcryptjs.decodeBase64(user.password))
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid password" });
    }

    const token = generateToken({ id: user._id });

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Route to handle user profile update
router.post("/auth/update/:_id", async (req, res) => {
  const { _id } = req.params;
  const updatedUserData = req.body;

  try {
    const user = await User.findByIdAndUpdate(_id, updatedUserData, {
      new: true, 
    });

    if (!user) {
      return res.status(404).json({ success: 0, message: "User not found" });
    }

    res.json({ success: 1, user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: 0, message: "Internal Server Error" });
  }
});


export default router;
