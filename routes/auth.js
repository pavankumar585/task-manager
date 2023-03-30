const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.genAuthToken();

  user = _.pick(user, ["_id", "name", "email", "isAdmin"]);
  res.setHeader("Authorization", `Bearer ${token}`).send(user);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(10).max(50),
    password: Joi.string().required().min(8).max(50),
  });

  return schema.validate(user);
}

module.exports = router;
