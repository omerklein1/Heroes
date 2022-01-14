const mongoose = require("mongoose"),
  users = require("./users"),
  heroes = require("./heroes"),
  dbURL = process.env["dbURL"];

const conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));

mongoose.connect(dbURL);

module.exports = { users, heroes };
