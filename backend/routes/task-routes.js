// Dependencies
const express = require("express");
const router = express.Router({ mergeParams: true });
const taskController = require("../controllers/task-controller");
const verifyAuthN = require("../middleware/verifyAuthN");
const verifyProjectOwnership = require("../middleware/verifyProjectOwnership");


// Task Endpoints - Full CRUD
//Create
router.post("/", verifyAuthN, verifyProjectOwnership, taskController.createTask);

// Read All
router.get("/", verifyAuthN, verifyProjectOwnership, taskController.getAllTasks);

// Update One
router.put("/:taskId", verifyAuthN, verifyProjectOwnership, taskController.updateTask);

// Delete One
router.delete("/:taskId", verifyAuthN, verifyProjectOwnership, taskController.deleteTask);

// Export
module.exports = router;