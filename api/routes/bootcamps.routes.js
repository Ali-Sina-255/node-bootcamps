const express = require("express");
const router = express.Router();
const advancedResults = require("../middleware/advancedResult");
const Bootcamp = require("../models/BootcampModel");
const { protect, authorize } = require("../middleware/auth");
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  bootcampPhotoUpload,
} = require("../controllers");

const courseRouter = require("./course.routes");
const reviewRouter = require("./review.routes");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/review", reviewRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamps);
router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);
router
  .route("/:id")
  .get(getBootcamp)
  .patch(protect, authorize("publisher", "admin"), updateBootcamps)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamps);

module.exports = router;
