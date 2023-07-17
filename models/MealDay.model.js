const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const mealDaySchema = new Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
  },
  breakfast:{ type: Schema.Types.ObjectId, ref: "Recipe" },
  lunch: { type: Schema.Types.ObjectId, ref: "Recipe" }, 
  dinner: { type: Schema.Types.ObjectId, ref: "Recipe" },

  userId: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = model("Mealday", mealDaySchema);