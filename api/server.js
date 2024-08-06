const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/api", (req, res) => {
  res.json({ msg: "Sanity Check" });
});

// catch all endpoint
server.use("*", (req, res, next) => {
  next({ status: 404, message: "not found" });
});

// global error handler
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
});

module.exports = server;
