// Dependencies
const Project = require("../models/project-model");
const User = require("../models/user-model");

// Route Handler Functions
// Create Project
async function createProject(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }
    const foundProject = await Project.findOne({ name: req.body.name, user: req.user._id });
    if (foundProject !== null) return res.status(400).json({ message: "This project name already exists." });
    const newProject = await Project.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ message: "Project created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

// Get All Projects
async function getAllProjects(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const projects = await Project.find({ user: req.user._id });
    res.status(200).json(projects)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

// Get One Project
async function getOneProject(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You do not own this project." });
    }

    res.status(200).json(project)
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

// Update Project
async function updateProject(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You do not own this project." });
    }

    const updatedProject = await Project.findByIdAndUpdate( projectId, req.body, { new: true, runValidators: true });
    res.status(200).json({ message: "Project updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

// Delete Project
async function deleteProject(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You do not own this project." });
    }

    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: "Project deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

// Export
module.exports = {
  createProject,
  getAllProjects,
  getOneProject,
  updateProject,
  deleteProject
}
