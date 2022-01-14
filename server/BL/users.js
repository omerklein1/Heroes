const bcrypt = require("bcrypt");

const Users = (DL) => {
  async function singin(data) {
    const inputData = data;
    const passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    const validation = inputData.password.match(passw);
    if (validation) {
      const hashedPass = await bcrypt.hash(inputData.password, 10);
      inputData.password = hashedPass;
      let result = DL.users.create(inputData);
      return result.name ? { id: result._id, name: result.name } : result;
    } else {
      return "You have to use 8 or more characters with a mix of letters, numbers & symbols!";
    }
  }

  async function login(data) {
    const findUsaer = await DL.users.readOne(data.name);
    if (findUsaer) {
      const match = await bcrypt.compare(data.password, findUsaer.password);
      console.log("pass match? : " + match);
      const resulet = match
        ? { _id: findUsaer._id, name: findUsaer.name }
        : "Wrong password";
      return resulet;
    } else {
      return "Error: User Name or Password incorrect!";
    }
  }

  return { singin, login };
};

module.exports = Users;
