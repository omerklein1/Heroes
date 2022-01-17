const HeroesModel = require("../models/HeroesModel");
require("../index");

async function read() {
  const result = await HeroesModel.find();
  return result;
}

async function update(filter, update) {
  const result = await HeroesModel.findOneAndUpdate(filter, update);
  return result;
}

module.exports = { read, update };
