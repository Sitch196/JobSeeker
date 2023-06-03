const Company = require("../models/companyModel");

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select("-__v").populate("jobs");
    res.status(200).json({
      status: "success",
      results: companies.length,
      data: {
        companies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.createCompany = async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        company: newCompany,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};
