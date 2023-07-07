const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.post("/add-review", reviewController.addReview);

router.get("/get-review/:id", reviewController.getReviewsByMovieOrTVShow);

module.exports = router;
