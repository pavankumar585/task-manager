const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlenght: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlenght: 50,
    unique: true,
  },
  password: {
    type: String,
    reuired: true,
    minlength: 8,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

userSchema.methods.genAuthToken = function () {
  const { _id, isAdmin } = this;

  return jwt.sign({ _id, isAdmin }, process.env.PRIVATE_KEY);
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(50),
    email: Joi.string().required().email().min(10).max(50),
    password: Joi.string().required().min(8).max(50),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
