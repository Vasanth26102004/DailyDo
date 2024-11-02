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

//Profile Image
/*router.post("/profile", async (req, res) => {
  const { email, imageLink } = req.body; // Assuming email and imageLink are sent in the request body

  try {
    let user = await User.findOneAndUpdate(
      { email },
      { image: imageLink }, // Update the image link
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User  not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving product" });
  }
});*/

export default router;
