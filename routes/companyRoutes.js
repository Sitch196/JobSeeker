const express = require("express");
const companyController = require("../Controllers/companyController");
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/").get(companyController.getAllCompanies);
// .post(companyController.createCompany);

module.exports = router;
