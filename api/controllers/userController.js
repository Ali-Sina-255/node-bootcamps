const ErrorResponse = require("../utils/errorResponse");
const { User } = require("../models");
const asyncHandler = require("../middleware/async");
// @desc  GET All Users
// @route PUT /api/v1/auth/users
// @access private/admin

const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc  GET All Users
// @route PUT /api/v1/auth/user:id
// @access private/admin

const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: user });
});

// @desc  create User
// @route POST /api/v1/auth/create
// @access private/admin

const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

// @desc  update User
// @route PUT /api/v1/auth/user:id
// @access private/admin

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});

// @desc  Delete User
// @route DELETE /api/v1/auth/user:id
// @access private/admin

const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "User delete successfully" });
});

module.exports = { createUser, getUser, getUsers, updateUser, deleteUser };
