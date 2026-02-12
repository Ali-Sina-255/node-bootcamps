const logger = (req, res, next) => {
  req.hello = "Hello, World";
  console.log("Middleware is run");

  next();
};
module.exports = logger;
