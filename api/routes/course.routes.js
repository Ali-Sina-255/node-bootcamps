const express = require("express");
const router = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedResult");
const Course = require("../models/CourseModel");
const { protect } = require("../middleware/auth");
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
  .post(protect, createCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
