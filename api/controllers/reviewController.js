const asyncHandler = require("../middleware/async");

const { Review, Bootcamp } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

// @desc  GET All REviews
// @route PUT /api/v1/reviews
// @access public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of  ${req.params.id}`),
    );
  }
  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc  ADD  REview
// @route POST /api/v1/reviews
// @access public
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `not bootcamp found with id ${req.params.bootcampId}`,
        404,
      ),
    );
  }

  const review = await Review.create(req.body);
  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc  UPdate  Review
// @route Update /api/v1/reviews/:id
// @access private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`not review found with id ${req.params.id}`, 404),
    );
  }
  // make sure review is belongs to users or admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorize to update review`, 401));
  }

  review = await Review.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc  Delete  Review
// @route Delete /api/v1/reviews/:id
// @access private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(
        `not review found with id ${req.params.bootcampId}`,
        404,
      ),
    );
  }
  // make sure review is belongs to users or admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorize to update review`, 401));
  }

  await review.remove();

  res.status(201).json({
    success: true,
    data: {},
  });
});
