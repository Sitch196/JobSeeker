const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const mongoose = require("mongoose");
const Company = require("../models/companyModel");

const DB = process.env.DATABASE_HOST;

const getConnection = async () => {
  await mongoose.connect(DB);
  console.log("connection to database successful");
};
getConnection();

const companies = JSON.parse(fs.readFileSync(`./companies.json`, "utf-8"));

const importData = async () => {
  try {
    await Company.create(companies);
    console.log("data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Company.deleteMany();
    console.log("all the data successfully deleted");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
}
if (process.argv[2] === "--delete") {
  deleteData();
}
