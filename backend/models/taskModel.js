import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; 

const Task = mongoose.model("Task",
  new mongoose.Schema({
  taskId: {
    type: String,
    default: uuidv4, 
    unique: true,   
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default:" ",
  },
  date:{
    type: String,
    required: true,
  },
  time:{
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now(),
  },
  done: {
    type: Boolean,
    default: false,
  },
}));

export default Task;