const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const advancedResults = require("../middleware/advancedResults");
const Bootcamp = require("../models/Bootcamp");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Reroute into other resource routers
router.use("/:bootcampId/courses", courseRouter);

// Get all bootcamps and create a bootcamp
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(createBootcamp);

// Get single bootcamp, update bootcamp, and delete bootcamp
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// Get bootcamps within a radius
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// Upload a bootcamp photo
router.route("/:id/photo").put(bootcampPhotoUpload);

module.exports = router;
