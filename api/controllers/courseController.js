const asyncHandler = require("../middleware/async");

const { Bootcamp, Course } = require("../models");
// @desc  GET bootcamp
// @route GET /api/v1/course
// @access public
const getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampid });
  } else {
    query = Course.find();
  }

  const course = await query;
  res.status(200).json({
    success: true,
    count: course.length,
    data: course,
  });
});

// @desc  GET bootcamp
// @route GET /api/v1/course/:id/
// @access public
const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description ",
  });

  if (!course) {
    return new ErrorResponse(`No course found with the id ${req.params.id}`);
  }
  res.status(200).json({
    success: true,
    count: course.length,
    data: course,
  });
});

// @desc  POST Course
// @route POST /api/v1/bootcamp/:bootcampid/course
// @access private
const createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp found with the id ${req.params.bootcampId}`,
        404,
      ),
    );
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
});

// @desc  PUT Update
// @route PUT /api/v1/bootcamp/:bootcampid/course
// @access private
const updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course found with the id ${req.params.id}`, 404),
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: course,
  });
});

// @desc  DELETE
// @route DELETE /api/v1/bootcamp/:bootcampid/course
// @access private
const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course found with the id ${req.params.id}`, 404),
    );
  }

  await course.deleteOne();
  res.status(200).json({
    success: true,
    message: "Delete successfully ",
    data: {},
  });
});

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
