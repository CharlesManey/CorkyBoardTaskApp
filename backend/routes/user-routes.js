// Dependencies
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const verifyAuthN = require("../middleware/verifyAuthN");

// User Endpoints
router.get("/", verifyAuthN, userController.getUser)
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Export
module.exports = router;