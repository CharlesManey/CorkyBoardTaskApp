// Dependencies
const mongoose = require("mongoose");

// Project Schema
const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required."],
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
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
const Project = new mongoose.model("Project", projectSchema);
module.exports = Project;