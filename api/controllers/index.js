const getBootcamps = require("./bootcampsController").getBootcamps;
const getBootcamp = require("./bootcampsController").getBootcamp;
const createBootcamps = require("./bootcampsController").createBootcamps;
const updateBootcamps = require("./bootcampsController").updateBootcamps;
const deleteBootcamps = require("./bootcampsController").deleteBootcamps;

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
};
