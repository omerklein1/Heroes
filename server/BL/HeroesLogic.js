const HeroesController = require("../DL_Mongo/controllers/HeroesController");

async function getHeroesList() {
  const result = await HeroesController.read();
  return result;
}

async function setHeroPowerUp(hero, _id) {
  const { current_power, trains_count, last_train_at } = hero;
  const lastTrain = new Date(last_train_at).toLocaleDateString("en-US");
  const today = new Date().toLocaleDateString("en-US");
  let update = {};
  const filter = { _id: _id };
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  if (lastTrain == today) {
    update = {
      current_power: (current_power / 100) * randomNumber + current_power,
      trains_count: trains_count + 1,
      last_power: current_power,
    };
  } else {
    update = {
      current_power: (current_power / 100) * randomNumber + current_power,
      trains_count: 1,
      last_train_at: today,
      last_power: current_power,
    };
  }

  return HeroesController.update(filter, update);
}

module.exports = { getHeroesList, setHeroPowerUp };
