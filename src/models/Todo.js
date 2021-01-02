const mongoose = require("mongoose");
module.exports = mongoose.connection.useDb("TODO").model(
  "todos",
  new mongoose.Schema({
    name: String,
    description: String,
    date: String,
  }),
  "todos"
);
