const TVShow = require("../models/tvShowModel");

// Get all TV shows with pagination
const getAllTVShows = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch TV shows from the database
    const tvShows = await TVShow.find()
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    // Count total number of TV shows
    const totalCount = await TVShow.countDocuments().exec();

    res.status(200).json({ tvShows, totalCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching TV shows" });
  }
};

// Get a single TV show by ID
const getTVShowById = async (req, res) => {
  try {
    const { tvShowId } = req.params;

    // Find the TV show by ID
    const tvShow = await TVShow.findById(tvShowId).exec();

    if (!tvShow) {
      return res.status(404).json({ message: "TV show not found" });
    }

    res.status(200).json({ tvShow });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the TV show" });
  }
};

// Add a new TV show (for admin role only)
const addTVShow = async (req, res) => {
  try {
    // Check if the user has admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can add TV shows" });
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

    // Create a new TV show
    const newTVShow = new TVShow({
      title,
      runtime,
      actors,
      director,
      producer,
      releaseDate,
      posterImage,
    });

    // Save the new TV show
    await newTVShow.save();

    res
      .status(201)
      .json({ message: "TV show added successfully", tvShow: newTVShow });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the TV show" });
  }
};

module.exports = { getAllTVShows, getTVShowById, addTVShow };
