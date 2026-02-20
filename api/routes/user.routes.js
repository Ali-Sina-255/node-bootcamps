const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers");

router.get("/", protect, authorize("admin"), getUsers);
router.get("/getUser", authorize("admin"), protect, getUser);
router.post("/create", authorize("admin"), createUser);

router.put("/update/:id", authorize("admin"), protect, updateUser);

router.delete("/delete/:id", authorize("admin"), protect, deleteUser);
module.exports = router;
