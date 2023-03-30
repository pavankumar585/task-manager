const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db")();
require("express-async-errors");

const users = require("./routes/users");
const auth = require("./routes/auth");
const todos = require("./routes/todos");
const error = require("./middleware/error");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/todos", todos);

app.use(error);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
