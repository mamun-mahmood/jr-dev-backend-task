const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
// Get all movies with pagination
router.get("/", movieController.getAllMovies);

//  Get a single movie by ID
router.get("/:id", movieController.getMovieById);

// Add a new movie (for admin role only)
router.post("/add-movie", authMiddleware, movieController.addMovie);
module.exports = router;
