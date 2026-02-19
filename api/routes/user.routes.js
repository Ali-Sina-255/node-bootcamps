const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResult");
const { User } = require("../models");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers");

router.get("/", protect, authorize("admin"), advancedResults(User), getUsers);
router.post("/create", protect, authorize("admin"), createUser);
router
  .get("/user/:id", protect, authorize("admin"), getUser)
  .put("/update/:id", protect, authorize("admin"), updateUser)
  .delete("/delete/:id", protect, authorize("admin"), deleteUser);
module.exports = router;
