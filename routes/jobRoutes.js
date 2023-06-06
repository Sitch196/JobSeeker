const express = require("express");
const jobController = require("../Controllers/jobController");
const router = express.Router();
const authController = require("../Controllers/authController");

router
  .route("/")
  .get(jobController.getAllJobs)
  .post(authController.protect, jobController.createJob);
router
  .route("/:id")
  .get(jobController.getJob)
  .patch(authController.protect, jobController.updateJob)
  .delete(authController.protect, jobController.deleteJob);

module.exports = router;
