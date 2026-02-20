const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const { User } = require("../models");
const asyncHandler = require("../middleware/async");
const { sendEmail } = require("../utils/sendEmail");
// @desc  Register User
// @route POST /api/v1/auth
// @access Public

const registerUser = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return next(
      new ErrorResponse("Please provide name, email, password and role", 400),
    );
  }
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendTokenResponse(user, 200, res);
});

// @desc  login User
// @route POST /api/v1/auth/login
// @access Public

const loginUser = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  const { email, password } = req.body;

  //   validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 400));
  }

  // check if password is match

  const isMatch = await user.isMatchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 400));
  }

  sendTokenResponse(user, 200, res);
});

// @desc  GET current login User
// @route POST /api/v1/auth/me
// @access private

const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });

  next();
});

// @desc  logout  User
// @route GET /api/v1/auth/logout
// @access private

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() * 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });

  next();
});
// @desc  Forgot password
// @route POST /api/v1/auth/forgotPassword
// @access public

const forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body?.email) {
    return next(new ErrorResponse("Please provide an email", 400));
  }
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 400));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
  res.status(200).json({
    success: true,
    data: "Email sent",
  });
});

// @desc  Reset password
// @route PUT /api/v1/auth/resetpassword/:resetToken
// @access public

const resetPassword = asyncHandler(async (req, res, next) => {
  // get hash token

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid reset token", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });
  sendTokenResponse(user, 200, res);
});

// @desc  update User Details
// @route PUT /api/v1/auth/updatedetails
// @access private

const updateUserDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.name) {
    fieldsToUpdate.name = req.body.name;
  }
  if (req.body.email) {
    fieldsToUpdate.email = req.body.email;
  }
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc  update User Password
// @route PUT /api/v1/auth/updatepassword
// @access private

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  // check the current password is ture
  if (!(await user.isMatchPassword(req.body.crrentPassword))) {
    return next(new ErrorResponse("Password is incorrect!"));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updatePassword,
  logoutUser,
};
