const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register a new user
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.json({
      status: "error",
      message: "Email and password are required",
    });
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({
      status: "success",
      message: "Authentication successful",
      token: token,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.send({
        status: "error",
        message: "Email already exists",
      });
    }
    return res.send({
      status: "error",
      message: error.message,
    });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: "error",
      message: "Email and password are required",
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }
    if (!user.authenticate(password)) {
      return res.json({
        status: "error",
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      status: "success",
      message: "Authentication successful",
      token: token,
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};

module.exports = { registerUser, loginUser };
