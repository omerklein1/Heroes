const DL_Mongo = require("../DL_Mongo"),
  users = require("./users")(DL_Mongo),
  heroes = require("./heroes")(DL_Mongo);

module.exports = { users, heroes };
