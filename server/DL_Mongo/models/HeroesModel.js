const mongoose = require("mongoose"),
  heroesSchema = new mongoose.Schema({
    name: { type: String, required: true, index: { unique: true } },
    ability: { type: String, required: true },
    start_train_at: { type: String, required: true },
    suit_colors: { type: String, required: true },
    last_power: { type: Number, required: true },
    current_power: { type: Number, required: true },
    last_train_at: { type: String, required: true },
    trains_count: {
      type: Number,
      required: true,
      max: [5, "A hero can train only 5 times a day!"],
    },
    trainer_id: { type: String, required: true },
  });

module.exports = mongoose.model("heroes", heroesSchema);
