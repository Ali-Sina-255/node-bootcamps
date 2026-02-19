const getBootcamps = require("./bootcampsController").getBootcamps;
const getBootcamp = require("./bootcampsController").getBootcamp;
const createBootcamps = require("./bootcampsController").createBootcamps;
const updateBootcamps = require("./bootcampsController").updateBootcamps;
const deleteBootcamps = require("./bootcampsController").deleteBootcamps;

const bootcampPhotoUpload =
  require("./bootcampsController").bootcampPhotoUpload;

const registerUser = require("./authController").registerUser;
const loginUser = require("./authController").loginUser;
const getMe = require("./authController").getMe;
const forgotPassword = require("./authController").forgotPassword;
const resetPassword = require("./authController").resetPassword;
const updateUserDetails = require("./authController").updateUserDetails;
const updatePassword = require("./authController").updatePassword
module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  bootcampPhotoUpload,
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updatePassword
};
