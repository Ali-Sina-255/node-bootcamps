const express = require("express");
const router = express.Router();

const advancedResults = require("../middleware/advancedResult");
const { Review } = require("../models");
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers");
const { protect, authorize } = require("../middleware/auth");
router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews,
  )
  .post(protect, authorize("admin", "user"), createReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("admin", "user"), updateReview)
  .delete(protect, authorize("admin", "user"), deleteReview);

module.exports = router;
