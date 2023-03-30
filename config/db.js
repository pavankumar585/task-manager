const mongoose = require("mongoose");

async function db() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = db;
