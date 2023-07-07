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
const addMovie = async (req, res) => {
  try {
    // Check if the user has admin role
    if (req?.user?.role !== "admin") {
      return res.status(403).json({ message: "Only admins can add movies" });
    }

    const {
      title,
      runtime,
      actors,
      director,
      producer,
      releaseDate,
      posterImage,
    } = req.body;

    // Create a new movie
    const newMovie = new Movie({
      title,
      runtime,
      actors,
      director,
      producer,
      releaseDate,
      posterImage,
    });

    // Save the new movie
    await newMovie.save();

    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the movie" });
  }
};
module.exports = { getAllMovies, getMovieById, addMovie };
