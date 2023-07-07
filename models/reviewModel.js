const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieOrTVShow: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel', required: true },
  onModel: { type: String, enum: ['Movie', 'TVShow'], required: true },
  rating: { type: Number, required: true },
  reviewContent: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
