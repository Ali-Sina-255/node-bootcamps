const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
    validate: [validator.isEmail, "Please provide a valid email!"],
  },

  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
    validate: [
      validator.isStrongPassword,
      "Password must be at least 8 characters with uppercase, lowercase and symbol!",
    ],
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and Return

UserSchema.methods.getSignJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// match user password entered to hashed password
UserSchema.methods.isMatchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate and hash password Token
UserSchema.methods.getResetPasswordToken = function () {
  // generate token

  const resetToken = crypto.randomBytes(30).toString("hex");

  // hash token and set to the reset field in the databases field

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set expire

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
  
};

module.exports = mongoose.model("User", UserSchema);
