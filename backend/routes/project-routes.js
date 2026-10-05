// Dependencies
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");
const verifyAuthN = require("../middleware/verifyAuthN");

// Project Endpoints - Full CRUD
// Create
router.post("/", verifyAuthN, projectController.createProject);

// Read All
router.get("/", verifyAuthN, projectController.getAllProjects);

// Read One
router.get("/:projectId", verifyAuthN, projectController.getOneProject);

// Update One
router.put("/:projectId", verifyAuthN, projectController.updateProject);

// Delete One
router.delete("/:projectId", verifyAuthN, projectController.deleteProject);

// Export
module.exports = router;