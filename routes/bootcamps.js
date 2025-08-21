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

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Reroute into other resource routers
router.use("/:bootcampId/courses", courseRouter);

// Get all bootcamps and create a bootcamp
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("admin", "publisher"), createBootcamp);

// Get single bootcamp, update bootcamp, and delete bootcamp
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("admin", "publisher"), updateBootcamp)
  .delete(protect, authorize("admin", "publisher"), deleteBootcamp);

// Get bootcamps within a radius
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// Upload a bootcamp photo
router
  .route("/:id/photo")
  .put(protect, authorize("admin", "publisher"), bootcampPhotoUpload);

module.exports = router;
