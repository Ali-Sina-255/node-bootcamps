const bootcampRoutes = require("./bootcamps.routes");
const courseRoutes = require("./course.routes");

const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");

module.exports = {
  bootcampRoutes,
  courseRoutes,
  userRoute,
  authRoute,
};
