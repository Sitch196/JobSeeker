const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A job must have a title"],
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: [true, "A job must have a location"],
  },
  salary: {
    type: Number,
    required: [true, "A job must have a salary"],
  },
  category: {
    type: String,
    required: [true, "A job must have a job type"],
  },
  company: {
    type: String,
    required: [true, "A job must have a company"],
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
