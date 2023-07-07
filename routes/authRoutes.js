const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Route: POST /auth/register
// Description: Register a new user
router.post("/register", registerUser);

// Route: POST /auth/login
// Description: Log in a user
router.post("/login", loginUser);

module.exports = router;
