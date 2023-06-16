const express = require("express");
const companyController = require("../Controllers/companyController");
const router = express.Router();
const upload = require("../middlewares/multer.js");
const authController = require("../Controllers/authController");

router.post("/signup", upload.single("image"), authController.signup);
router.post("/login", authController.login);
router.get(
  "/me",
  authController.protect,
  companyController.getMe,
  companyController.getCompany
);
router
  .route("/")
  .get(
    authController.protect,
    authController.permissionTo("admin"),
    companyController.getAllCompanies
  );

router
  .route("/:id")
  .get(authController.protect, companyController.getCompany)
  .delete(authController.protect, companyController.deleteCompany)
  .patch(authController.protect, companyController.updateCompany);
module.exports = router;
