// Dependencies
const mongoose = require("mongoose");

// Task Schema
const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Task description is required."],
    trim: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true
});

// Export
const Task = new mongoose.model("Task", taskSchema);
module.exports = Task;