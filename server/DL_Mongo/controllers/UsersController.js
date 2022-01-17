const UsersModel = require("../models/UsersModel");
require("../index");

async function create(inputData) {
  let resule = await readOne(inputData.name);
  if (resule) return "user name is already exists";

  createData = new UsersModel(inputData);
  await createData.save(async function (err, data) {
    if (err) return err;

    console.log("DB");
    return data;
  });

  return readOne(inputData.name);
}

async function readOne(name) {
  const result = await UsersModel.findOne({ name: name });
  return result;
}

module.exports = { create, readOne };
