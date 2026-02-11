const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require("../controllers");

// Routes for collection
router.route("/").get(getBootcamps).post(createBootcamps);

// Routes for single bootcamp by ID
router
  .route("/:id")
  .get(getBootcamp)
  .patch(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
