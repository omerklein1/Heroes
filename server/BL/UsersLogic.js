const UsersController = require("../DL_Mongo/controllers/UsersController");
const bcrypt = require("bcrypt");

async function singin(data) {
  const inputData = data;
  console.log("BL");
  const passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  const validation = inputData.password.match(passw);
  if (validation) {
    const hashedPass = await bcrypt.hash(inputData.password, 10);
    inputData.password = hashedPass;
    let result = UsersController.create(inputData);
    return result.name ? { id: result._id, name: result.name } : result;
  } else {
    return "You have to use 8 or more characters with a mix of letters, numbers & symbols!";
  }
}

async function login(data) {
  const findUser = await UsersController.readOne(data.name);
  if (findUser) {
    //if localStorege - check match name & _id
    if (!data.password) {
      if (data._id === findUser._id.toString()) {
        return findUser;
      } else {
        return "Your User is log out. please log in!";
      }
    }

    const match = await bcrypt.compare(data.password, findUser.password);
    console.log("pass match? : " + match);
    const resulet = match
      ? { _id: findUser._id, name: findUser.name }
      : "Wrong password";
    return resulet;
  } else {
    return "Error: User Name or Password incorrect!";
  }
}

module.exports = { singin, login };
