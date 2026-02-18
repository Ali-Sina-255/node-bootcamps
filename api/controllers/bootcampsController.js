const ErrorResponse = require("../utils/errorResponse");

const { Bootcamp } = require("../models");
const asyncHandler = require("../middleware/async");

// @desc  GET all bootcamps
// @route GET /api/v1/bootcamps
// @access Private
const getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
  
});

// @desc  GET single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Private
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404),
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc  CREATE bootcamp
// @route POST /api/v1/bootcamps
// @access Private
const createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc  UPDATE bootcamp
// @route PATCH /api/v1/bootcamps/:id
// @access Private
const updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc  DELETE bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
const deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    next(error);
  }
  res.status(200).json({
    success: true,
    message: `Bootcamp with ID ${req.params.id} deleted successfully`,
    data: {},
  });
});

// @desc  POST Upload Photo
// @route PUT /api/v1/bootcamps/:id/photo
// @access Private
const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        400,
      ),
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload file`, 400));
  }

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  bootcampPhotoUpload,
};
