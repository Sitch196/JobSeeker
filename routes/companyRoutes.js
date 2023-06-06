const express = require("express");
const companyController = require("../Controllers/companyController");
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/")
  .get(
    authController.protect,
    authController.permissionTo("admin"),
    companyController.getAllCompanies
  );

router
  .route("/:id")
  .get(authController.permissionTo("admin"), companyController.getCompany)
  .delete(authController.protect, companyController.deleteCompany)
  .patch(authController.protect, companyController.updateCompany);
module.exports = router;
