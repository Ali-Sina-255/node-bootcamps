const Bootcamp = require("../models/BootcampModel");
// @desc  GET all bootcamps
// @route GET /api/v1/bootcamps
// @access Private
const getBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
};

// @desc  GET single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Private
const getBootcamp = async (req, res, next) => {
  res.status(200).json({
    success: true,

    message: `Show bootcamp with ID ${req.params.id}`,
  });
};

// @desc  CREATE bootcamp
// @route POST /api/v1/bootcamps
// @access Private
const createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
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
