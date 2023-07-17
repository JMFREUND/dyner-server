const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  name: { type: String, unique: true, required: true },
  imageUrl: { type: String, required: true },
  ingredients:[
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
      // quantity: { type: Number, required: true }
    }
  ],
  instruction: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = model("Recipe", recipeSchema);