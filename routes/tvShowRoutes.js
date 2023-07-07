const express = require("express");
const tvShowController = require("../controllers/tvShowController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", tvShowController.getAllTVShows);

// Get a single TV show by ID
router.get("/:tvShowId", tvShowController.getTVShowById);

//  Add a new TV show (for admin role only)
router.post("/add-new", authMiddleware, tvShowController.addTVShow);

module.exports = router;
