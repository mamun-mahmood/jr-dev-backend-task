const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization?.split(" ")[1];

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.userData = { userId: decodedToken.id, email: decodedToken.email };
    req.user = { role: decodedToken.role, id: decodedToken.id };
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
