const express = require("express");
const { getAllReviews, getReview } = require("../controllers/reviews");
const Review = require("../models/Review");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Review, { path: "bootcamp", select: "name description" }),
    getAllReviews
  );

router
  .route("/:id")
  .get(getReview);

module.exports = router;
