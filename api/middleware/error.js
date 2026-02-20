const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  // Preserve the original error message
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Resources not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongo duplicate key
  if (err.code === 11000) {
    const message = "Duplicated Field value entered!";
    error = new ErrorResponse(message, 400);
  }

  // Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Log the original error for debugging
  // (use the original err object, not the shallow-cloned one)
  console.error(err);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
