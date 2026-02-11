// @desc  GET all bootcamps
// @route GET /api/v1/bootcamps
// @access Private
const getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Show all bootcamps ...",
  });
};

// @desc  GET single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Private
const getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Show bootcamp with ID ${req.params.id}`,
  });
};

// @desc  CREATE bootcamp
// @route POST /api/v1/bootcamps
// @access Private
const createBootcamps = (req, res, next) => {
  res.status(201).json({
    success: true,
    message: "Bootcamp created",
    data: req.body,
  });
};

// @desc  UPDATE bootcamp
// @route PATCH /api/v1/bootcamps/:id
// @access Private
const updateBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Bootcamp with ID ${req.params.id} updated`,
    data: req.body,
  });
};

// @desc  DELETE bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
const deleteBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Bootcamp with ID ${req.params.id} deleted`,
  });
};

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
};
