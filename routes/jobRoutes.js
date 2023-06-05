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
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;
