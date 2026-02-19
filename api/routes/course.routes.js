const express = require("express");
const router = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedResult");
const Course = require("../models/CourseModel");
const { protect, authorize } = require("../middleware/auth");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router
  .route("/")
  .get(
    advancedResults(Course, { path: "bootcamp", select: "name description" }),
    getCourses,
  )
  .post(protect, authorize("publisher", "admin"), createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
