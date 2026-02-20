const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
// security
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
// Routes
const bootcampsRoutes = require("./routes/bootcamps.routes");
const courseRoutes = require("./routes/course.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const reviewRoutes = require("./routes/review.routes");
// Load environment variables
dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

// Connect to Database
connectDB();

const app = express();

// security for authentication
app.use(mongoSanitize());
// set security headers
app.use(helmet());
app.use(xssClean());

const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1,
});

app.use(limiter);

//prevent http parma pollution
app.use(hpp());
// Enable cors
app.use(cors());

//  Body parser
app.use(express.json());

app.use(cookieParser());

// Logging middleware (development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// upload file method
app.use(
  fileupload({
    createParentPath: true,
  }),
);

// set static folder
app.use(express.static(path.join(__dirname, "public")));
// Mount routes
app.use("/api/v1/bootcamps", bootcampsRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// Error handler (MUST be last middleware)
app.use(errorHandler);

// Environment variables
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Start server
const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold,
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
