import express from "express";
import Task from "../models/taskModel.js";

const router = express.Router();

// Get all tasks for a specific user// Get all tasks for a specific user
router.get("/alltask", async (req, res) => {
  const userId = req.headers["user-id"]; // Get userId from headers

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  try {
    const tasks = await Task.find({ userId });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// Add a new task for a specific user
router.post("/addtask", async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    let { title, description, date, time } = req.body;

    if (!userId || !title || !date || !time) {
      return res.json({
        success: false,
        message:
          "All required fields (userId, title, date, time) must be provided",
      });
    }

    const newTask = new Task({
      userId: userId,
      title: title,
      description: description || " ",
      date: date,
      time: time,
      dateTime: `${date}T${time}:00.000Z`,
    });

    await newTask.save();

    res.status(201).json({ success: true, newTask: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// Change the Existing task for a specific user
router.post("/updatetask", async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    const { taskId, title, description, date, time } = req.body;

    if (!userId || !taskId) {
      return res.json({
        success: false,
        message: "userId and taskId must be provided",
      });
    }
    // Find the task by taskId and userId to ensure the user can only update their own tasks
    const task = await Task.findOne({ _id: taskId, userId: userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    // Update only the fields that are provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description || " ";
    if (date !== undefined) task.date = date;
    if (time !== undefined) task.time = time;
    if (date && time) task.dateTime = `${date}T${time}:00.000Z`;

    await task.save();

    res.status(200).json({ success: true, updatedTask: task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// Mark task as done for a specific user
router.put("/donetask/:taskId/done", async (req, res) => {
  const userId = req.headers["user-id"]; // Get userId from headers
  const { taskId } = req.params;

  try {
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    task.done = true;
    await task.save();
    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// Delete a task for a specific user
router.delete("/deletetask/:taskId", async (req, res) => {
  const userId = req.headers["user-id"]; // Get userId from headers
  const { taskId } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted successfully", task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

export default router;
