const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require("../controllers");

const courseRouter = require("./course.routes");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(createBootcamps);

router
  .route("/:id")
  .get(getBootcamp)
  .patch(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
