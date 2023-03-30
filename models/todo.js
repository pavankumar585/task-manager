const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(255),
    completed: Joi.boolean(),
  });

  return schema.validate(todo);
}

module.exports.Todo = Todo;
module.exports.validate = validateTodo;
