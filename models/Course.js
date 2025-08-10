const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please add a course description"],
  },
  weeks: {
    type: String,
    trim: true,
    required: [true, "Please add a number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill level"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
