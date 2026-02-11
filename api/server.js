const express = require("express");
const { bootcampsRoutes } = require("./routes");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

const app = express();

// Middleware
app.use(express.json());

// Mount routes
app.use("/api/v1/bootcamps", bootcampsRoutes);

// Environment variables
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});
