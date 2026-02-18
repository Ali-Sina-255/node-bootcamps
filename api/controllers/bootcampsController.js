const ErrorResponse = require("../utils/errorResponse");

const { Bootcamp } = require("../models");
const asyncHandler = require("../middleware/async");
const path = require("path");
const fs = require("fs");


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

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  const maxFileUpload =
    Number.parseInt(process.env.MAX_FILE_UPLOAD, 10) || 1000000;
  if (file.size > maxFileUpload) {
    const maxMb = Math.max(1, Math.round(maxFileUpload / (1024 * 1024)));
    return next(
      new ErrorResponse(`Please upload an image file less than ${maxMb}MB`, 400),
    );
  }

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  const uploadDir = (() => {
    const configured = process.env.FILE_UPLOAD_PATH;
    if (!configured) return path.join(process.cwd(), "public", "uploads");
    return path.isAbsolute(configured)
      ? configured
      : path.join(process.cwd(), configured);
  })();

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uploadPath = path.join(uploadDir, file.name);

  file.mv(uploadPath, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
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
