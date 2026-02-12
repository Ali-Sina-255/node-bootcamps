const Bootcamp = require("../models/BootcampModel");
// @desc  GET all bootcamps
// @route GET /api/v1/bootcamps
// @access Private
const getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamp.length,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc  GET single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Private
const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
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
const updateBootcamps = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// @desc  DELETE bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
const deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      message: `Bootcamp with ID ${req.params.id} deleted successfully`,
      data: {},
    });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
};
