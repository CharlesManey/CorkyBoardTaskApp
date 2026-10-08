// Dependencies
const Task = require("../models/task-model");
const Project = require("../models/project-model");
const User = require("../models/user-model");

// Route Handler Functions
// Create Task
async function createTask(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const foundTask = await Task.findOne({ title: req.body.title, project: req.project._id, user: req.user._id });

    if (foundTask !== null) return res.status(400).json({ message: "This task title already exists." });

    const newTask = await Task.create({
      ...req.body,
      project: req.project._id,
      user: req.user._id,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Read All Tasks
async function getAllTasks(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const tasks = await Task.find({ project: req.project._id, user: req.user._id });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Update One Task
async function updateTask(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const { taskId } = req.params;

    const task = await Task.findOne({
      _id: taskId,
      project: req.project._id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found in this project." });
    }

    const updatedTask = await Task.findByIdAndUpdate( taskId, req.body, { new: true, runValidators: true });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Delete One Task
async function deleteTask(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const { taskId } = req.params;

    const task = await Task.findOne({
      _id: taskId,
      project: req.project._id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found in this project." });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

//Export
module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask
}