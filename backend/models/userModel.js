import mongoose from "mongoose";

const User = mongoose.model("User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:  " ",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

export default User;
