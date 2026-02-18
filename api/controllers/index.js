const getBootcamps = require("./bootcampsController").getBootcamps;
const getBootcamp = require("./bootcampsController").getBootcamp;
const createBootcamps = require("./bootcampsController").createBootcamps;
const updateBootcamps = require("./bootcampsController").updateBootcamps;
const deleteBootcamps = require("./bootcampsController").deleteBootcamps;

const bootcampPhotoUpload =
  require("./bootcampsController").bootcampPhotoUpload;

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  bootcampPhotoUpload,
};
