const Review = require("../models/reviewModel");
const Movie = require("../models/movieModel");
const TVShow = require("../models/tvShowModel");

// Add a review
const addReview = async (req, res) => {
  try {
    const { id, rating, reviewContent } = req.body;

    // Check if the movie or TV show exists
    const movieOrTVShow =
      (await Movie.findById(id)) || (await TVShow.findById(id));
    if (!movieOrTVShow) {
      return res.status(404).json({ message: "Movie or TV show not found" });
    }

    // Create a new review
    const newReview = new Review({
      user: req.user._id,
      movieOrTVShow: movieOrTVShow._id,
      onModel: movieOrTVShow instanceof Movie ? "Movie" : "TVShow",
      rating,
      reviewContent,
    });

    // Save the new review
    await newReview.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the review" });
  }
};

// Get all reviews for a specific movie or TV show
const getReviewsByMovieOrTVShow = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the movie or TV show exists
    const movieOrTVShow =
      (await Movie.findById(id)) || (await TVShow.findById(id));
    if (!movieOrTVShow) {
      return res.status(404).json({ message: "Movie or TV show not found" });
    }

    // Get all reviews for the movie or TV show
    const reviews = await Review.find({ movieOrTVShow: movieOrTVShow._id })
      .populate("user", "username")
      .exec();

    res.status(200).json({ reviews });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the reviews" });
  }
};

module.exports = { addReview, getReviewsByMovieOrTVShow };
