const express = require("express");
const { bootcampsRoutes } = require("./routes");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

connectDB();
const app = express();
app.use(express.json());
// Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes
app.use("/api/v1/bootcamps", bootcampsRoutes);

// Environment variables
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Start server
const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold,
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
