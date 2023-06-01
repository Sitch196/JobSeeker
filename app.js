const express = require("express");
const app = express();
app.use(express.json());
const jobRouter = require("./routes/jobRoutes");

app.use("/api/v1/jobs", jobRouter);
//HANDLE UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

// global error handling middleware

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
