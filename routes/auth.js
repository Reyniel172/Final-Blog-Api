const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

// Login route
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
