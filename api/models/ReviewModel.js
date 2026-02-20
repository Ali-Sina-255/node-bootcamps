const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a Title"],
  },
  text: {
    type: String,
    required: [true, "Please add a Title"],
  },
  rating: {
    type: Number,
    required: [true, "Please add rating between 1 and 10 "],
    min: 1,
    max: 10,
  },

  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user form submitting more then one review pre view

ReviewsSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

ReviewsSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: {
        bootcamp: new mongoose.Types.ObjectId(bootcampId),
      },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageReview: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageReview: obj[0].averageRating,
    });
  } catch (error) {
    console.log(error);
  }

  console.log(obj);
};

ReviewsSchema.post("save", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

ReviewsSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model("Review", ReviewsSchema);
