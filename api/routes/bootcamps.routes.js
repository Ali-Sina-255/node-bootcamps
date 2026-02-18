const express = require("express");
const router = express.Router();
const advancedResults = require("../middleware/advancedResult");
const Bootcamp = require("../models/BootcampModel");

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

router.route("/").get(advancedResults(Bootcamp, "courses"), getBootcamps).post(createBootcamps);
router.route("/:id/photo").put(bootcampPhotoUpload);
router.route();
router
  .route("/:id")
  .get(getBootcamp)
  .patch(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
