const Movie = require("../models/movieModel");

// Get all movies with pagination
const getAllMovies = async (req, res) => {
  try {
    const { page, limit } = req.query;

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch movies from the database
    const movies = await Movie.find().skip(skip).limit(parseInt(limit)).exec();

    // Count total number of movies
    const totalCount = await Movie.countDocuments().exec();

    res.status(200).json({ movies, totalCount, page, limit });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching movies" });
  }
};

// Get a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.query;

    // Find the movie by ID
    const movie = await Movie.findById(movieId).exec();

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ movie });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the movie" });
  }
};

module.exports = { getAllMovies, getMovieById };
