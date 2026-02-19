const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/forgotPassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
module.exports = router;
