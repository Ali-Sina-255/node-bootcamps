const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updatePassword,
} = require("../controllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", protect, getMe);
router.post("/forgotPassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.put("/updatedetails", protect, updateUserDetails);
router.put("/updatepassword", protect, updatePassword);
module.exports = router;
