const express = require("express");
const companyController = require("../Controllers/companyController");
const router = express.Router();

router
  .route("/")
  .get(companyController.getAllCompanies)
  .post(companyController.createCompany);

module.exports = router;
