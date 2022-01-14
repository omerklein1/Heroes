const Heroes = (DL) => {
  async function getHeroesList() {
    const result = await DL.heroes.read();
    return result;
  }

  async function setHeroPowerUp(data) {
    const { name, current_power, trains_count, last_train_at, last_power } =
      data;
    const lastTrain = new Date(last_train_at).toLocaleDateString("en-US");
    const today = new Date().toLocaleDateString("en-US");
    let update = {};
    const filter = { name: name };
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

    return DL.heroes.update(filter, update);
  }

  return { getHeroesList, setHeroPowerUp };
};

module.exports = Heroes;
