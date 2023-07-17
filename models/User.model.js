const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  meals: [{ type: Schema.Types.ObjectId, ref: "MealDay" }]
});

module.exports = model("User", userSchema);