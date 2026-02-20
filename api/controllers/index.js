const getBootcamps = require("./bootcampsController").getBootcamps;
const getBootcamp = require("./bootcampsController").getBootcamp;
const createBootcamps = require("./bootcampsController").createBootcamps;
const updateBootcamps = require("./bootcampsController").updateBootcamps;
const deleteBootcamps = require("./bootcampsController").deleteBootcamps;

const bootcampPhotoUpload =
  require("./bootcampsController").bootcampPhotoUpload;
// auth
const registerUser = require("./authController").registerUser;
const loginUser = require("./authController").loginUser;
const getMe = require("./authController").getMe;
const forgotPassword = require("./authController").forgotPassword;
const resetPassword = require("./authController").resetPassword;
const updateUserDetails = require("./authController").updateUserDetails;
const updatePassword = require("./authController").updatePassword;
// Users
const createUser = require("./userController").createUser;
const getUsers = require("./userController").getUsers;
const getUser = require("./userController").getUser;
const updateUser = require("./userController").updateUser;
const deleteUser = require("./userController").deleteUser;
// Reviews

const getReviews = require("./reviewController").getReviews;
const getReview = require("./reviewController").getReview;
const createReview = require("./reviewController").createReview;
const updateReview = require("./reviewController").updateReview;
const deleteReview = require("./reviewController").deleteReview;

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
  updatePassword,
  // user
  createUser,
  deleteUser,
  updateUser,
  getUsers,
  getUser,

  // reviews

  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
