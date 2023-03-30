const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Todo, validate } = require("../models/todo");
const validateId = require("../middleware/validateId");

router.get("/", [auth, admin], async (req, res) => {
  const todos = await Todo.find();

  res.send(todos);
});

router.get("/mine", [auth], async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });

  res.send(todos);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.create({ user: req.user._id, title: req.body.title });

  res.send(todo);
});

router.put("/:id", [auth, validateId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    {
      $set: {
        title: req.body.title,
        completed: req.body.completed,
      },
    },
    { new: true }
  );
  if (!todo) return res.status(404).send("Task not found");

  res.send(todo);
});

router.delete("/:id", [auth, validateId], async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!todo) return res.status(404).send("Task not found.");

  res.send(todo);
});

module.exports = router;
