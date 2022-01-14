const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

const userTable = mongoose.model("users", userSchema);

async function create(inputData) {
  let resule = await readOne(inputData.name);
  if (resule) return "user name is already exists";

  createData = new userTable(inputData);
  await createData.save(async function (err, data) {
    if (err) return err;
    return data;
  });

  return readOne(inputData.name);
}

async function readOne(name) {
  const result = await userTable.findOne({ name: name });
  return result;
}

module.exports = { create, readOne };
