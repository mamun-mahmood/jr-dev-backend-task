const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  runtime: { type: Number, required: true },
  actors: [{ type: String, required: true }],
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer', required: true },
  releaseDate: { type: Date, required: true },
  posterImage: { type: String },
});

const TVShow = mongoose.model('TVShow', tvShowSchema);

module.exports = TVShow;
