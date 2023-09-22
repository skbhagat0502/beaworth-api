const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Function to validate Indian phone numbers
function validateIndianPhoneNumber(phoneNumber) {
  // Regular expression pattern for Indian phone numbers
  const phoneRegex = /^[6-9]\d{9}$/;

  // Remove spaces and hyphens, if present
  phoneNumber = phoneNumber.replace(/[\s-]+/g, "");

  // Test the phone number against the regular expression
  return phoneRegex.test(phoneNumber);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  phone: {
    type: String,
    required: [true, "Please Enter Your Phone Number"],
    unique: true,
    validate: {
      validator: validateIndianPhoneNumber, // Use the phone number validation function
      message: "Please Enter a valid Indian Phone Number",
    },
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows unique to be null or undefined, treating them as non-existent
    validate: {
      validator: function (value) {
        // Validate email only if it is provided
        if (value) {
          return validator.isEmail(value);
        }
        // If email is not provided, no validation is needed
        return true;
      },
      message: "Please Enter a valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
