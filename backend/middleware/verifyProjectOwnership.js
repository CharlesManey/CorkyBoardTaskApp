// Dependencies
const Project = require("../models/project-model");

// Verify Project Ownership Function
async function verifyProjectOwnership(req, res, next) {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You do not own this project." });
    }

    req.project = project;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is invalid." });
  }
}

// Export
module.exports = verifyProjectOwnership;