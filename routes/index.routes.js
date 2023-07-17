const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

/* 
Recipe Routes
GET /recipes: all recipes rendered (gallery)
POST /recipes: creates a new recipe
GET /recipes/:recipeId recipe details
PUT /recipes/:recipeId updates recipe
DELETE /recipes/:recipeId deletes recipe

MealDay Routes 
GET /mealday: all mealdays rendered (mealplan)
POST /mealday: creates a new mealday
GET /mealday/:mealId returns mealday details
PUT /mealday/:mealdayId updates mealday
DELETE /mealday/:mealdayId deletes mealday
*/

module.exports = router;
