const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.ObjectId,
      ref: "Company",
      // required: [true, "A job must belong to a company"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
