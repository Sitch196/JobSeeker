const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A company must have a name"],
    },
    founded: {
      type: Number,
    },
    size: {
      type: Number,
      required: [true, "A company must have a size"],
    },
    location: {
      type: String,
      required: [true, "A company must have a location"],
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

companySchema.virtual("jobs", {
  ref: "Job",
  foreignField: "company",
  localField: "_id",
});
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
