const ErrorResponse = require("../utils/errorResponse");

const { Bootcamp } = require("../models");
const asyncHandler = require("../middleware/async");

// @desc  GET all bootcamps
// @route GET /api/v1/bootcamps
// @access Private
const getBootcamps = asyncHandler(async (req, res, next) => {
  // Copy query object
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["page", "limit", "sort", "select"];

  removeFields.forEach((param) => delete reqQuery[param]);

  // Advanced filtering
  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`,
  );

  // Build query
  let query = Bootcamp.find(JSON.parse(queryStr));

  // 🔥 SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // 🔥 SORT
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // 🔥 PAGINATION
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5; // smaller default for testing
  const skip = (page - 1) * limit;

  const total = await Bootcamp.countDocuments(JSON.parse(queryStr));

  query = query.skip(skip).limit(limit);

  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  if (skip + bootcamps.length < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (skip > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    total,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
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

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
};
