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
    type: Number,
    required: [true, "Please add a number of weeks"],
  },

  tuition: {
    type: Number,
    required: [true, "Please add a course tuition"],
  },

  minimumSkill: {
    type: String,
    trim: true,
    required: [true, "Please add a course minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },

  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },

  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bootcamp",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: {
        bootcamp: new mongoose.Types.ObjectId(bootcampId),
      },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (error) {
    console.log(error);
  }

  console.log(obj);
};

CourseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

CourseSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CourseSchema);
