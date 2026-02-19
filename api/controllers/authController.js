const ErrorResponse = require("../utils/errorResponse");
const { User } = require("../models");
const asyncHandler = require("../middleware/async");

// @desc  Register User
// @route POST /api/v1/auth
// @access Public

const registerUser = asyncHandler(async (req, res, next) => {
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

// @desc  GET current login User
// @route POST /api/v1/auth/me
// @access private

const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
module.exports = { registerUser, loginUser, getMe };
