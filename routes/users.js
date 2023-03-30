const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateId = require("../middleware/validateId");

router.get("/me", [auth], async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/:id", [auth, admin, validateId], async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).send("User not found.");

  res.send(user);
});

router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find({ isAdmin: undefined }).select("-password");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists.");

  user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.genAuthToken();

  user = _.pick(user, ["_id", "name", "email", "isAdmin"]);

  res.setHeader("Authorization", `Bearer ${token}`).send(user);
});

module.exports = router;
