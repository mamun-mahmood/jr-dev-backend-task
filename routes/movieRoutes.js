const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

// Get all movies with pagination
router.get("/", movieController.getAllMovies);

//  Get a single movie by ID
router.get("/:id", movieController.getMovieById);

module.exports = router;
