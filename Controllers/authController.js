const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Company = require("../models/companyModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      passwordConfirm,
      size,
      location,
      description,
    } = req.body;

    const exists = await Company.findOne({ email });
    const dublicatename = await Company.findOne({ name });

    if (exists) {
      throw new Error("Email already in use");
    }
    if (dublicatename) {
      throw new Error("Company with this name already registered");
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw Error("Password needs to be at least 6 Characters");
    }
    const image = req.file ? req.file.path : "";

    const newUser = await Company.create({
      name,
      email,
      password,
      passwordConfirm,
      size,
      location,
      description,
      image,
    });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "please provide email and password",
    });
  }

  try {
    const user = await Company.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect Email or password",
      });
    }

    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect Email or password",
      });
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      id: user._id,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.protect = async (req, res, next) => {
  //getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "you are not logged in! please log in to get access",
    });
  }
  // // validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if user still exists
  const freshUser = await Company.findById(decoded.id);
  if (!freshUser) {
    return res.status(401).json({
      status: "fail",
      message: "the user belonging to this token does no longer exist",
    });
  }
  req.user = freshUser;
  //check if user changed password after the token was issued
  next();
};
exports.permissionTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failed",
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};
