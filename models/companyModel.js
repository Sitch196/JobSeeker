const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A company must have a name"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid Email"],
      required: [true, "A user must have an email"],
    },
    password: {
      type: String,
      required: [true, "'A user must have a password"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "passwords are not the same",
      },
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
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // hash the password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

companySchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
