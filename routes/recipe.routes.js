const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MealDay = require("../models/MealDay.model");
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");
const ingredients = require("../models/Ingredient.model");

router.post("/recipes", (req, res, next) => {
  const { name, imageUrl, instruction, ingredients, cookingTime, userId } =
    req.body;

  Recipe.create({
    name,
    imageUrl,
    instruction,
    ingredients,
    cookingTime,
    userId,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.json(err));
});

router.get("/recipes", (req, res, next) => {
  const userId = req.payload._id;
  Recipe.find({ userId })
    .populate('ingredients')
    .then((allRecipes) => res.json(allRecipes))
    .catch((err) => res.json(err));
});

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

router.get("/recipes/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Recipe.findById(recipeId)
    .populate('ingredients')
    .then((recipe) => res.status(200).json(recipe))
    .catch((error) => res.json(error));
});
router.put("/recipes/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
    .then((updatedRecipe) => res.json(updatedRecipe))
    .catch((error) => res.json(error));
});

router.delete("/recipes/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Recipe.findByIdAndRemove(recipeId)
    .then(() =>
      res.json({
        message: `Recipe with ${recipeId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});


router.get("/search", (req, res, next) => {
  const userId = req.payload._id;
  Recipe.find({ name: { $regex: req.query.name }, userId:userId })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => res.json(error));
});


module.exports = router;
