const express = require("express");
const router = express.Router();
const advancedResults = require("../middleware/advancedResult");
const Bootcamp = require("../models/BootcampModel");
const { protect } = require("../middleware/auth");
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  bootcampPhotoUpload,
} = require("../controllers");

const courseRouter = require("./course.routes");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamps);
router.route("/:id/photo").put(protect, bootcampPhotoUpload);
router
  .route("/:id")
  .get(getBootcamp)
  .patch(protect, updateBootcamps)
  .delete(protect, deleteBootcamps);

module.exports = router;
