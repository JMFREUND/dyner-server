const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
  name: { type: String, unique: true, required: true },
  inStock: { type: Boolean, required: true, default: true },
 
});

module.exports = model("Ingredient", ingredientSchema);