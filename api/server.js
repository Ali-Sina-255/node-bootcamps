const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Routes
const bootcampsRoutes = require("./routes/bootcamps.routes");
const courseRoutes = require("./routes/course.routes");

// Load environment variables
dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

// Connect to Database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Logging middleware (development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes
app.use("/api/v1/bootcamps", bootcampsRoutes);
app.use("/api/v1/courses", courseRoutes);

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
