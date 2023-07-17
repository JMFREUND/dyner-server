const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ingredient = require("../models/Ingredient.model")





router.get("/ingredients", (req, res, next) => {
    Ingredient.find()
      .then((allIngredients) => res.json(allIngredients))
      .catch((err) => res.json(err));
  });

router.get("/ingredients/search", (req, res, next) => {
    Ingredient.find({ name: { $regex: req.query.name } })
      .then((response) => {
        res.json(response);
      })
      .catch((error) => res.json(error));
  });
   
router.put("/ingredients/:ingredientId", (req, res, next) => {
    const { ingredientId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Ingredient.findByIdAndUpdate(ingredientId, req.body, { new: true })
      .then((updatedIngredient) => res.json(updatedIngredient))
      .catch((error) => res.json(error));
  });



  module.exports = router;