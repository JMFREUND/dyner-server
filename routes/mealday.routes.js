const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MealDay = require("../models/MealDay.model")
const Recipe = require("../models/Recipe.model")


router.post("/meals",(req, res, next)=>{
    const {day, breakfast, lunch, dinner, userId} = req.body;

    MealDay.create({day, breakfast, lunch, dinner, userId})
    .then ((response) => res.json(response))
    .catch((err)=> res.json(err));

})

router.get("/meals", (req,res, next)=>{
  const userId = req.payload._id;

    MealDay.find({userId})
    .populate("breakfast lunch dinner")
    .then((allMeals) => {
      console.log(userId)
      res.json(allMeals)})
    .catch((err)=> res.json(err));
})

router.get("/meals/:mealId", (req, res, next) => {
    const { mealId } = req.params;

    
  if (!mongoose.Types.ObjectId.isValid(mealId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
}

MealDay.findById(mealId)
    .populate('breakfast lunch dinner')
    .then((recipe) => res.status(200).json(recipe))
    .catch((error) => res.json(error));
});


router.put("/meals/:mealId", (req, res, next) => {
    const { mealId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(mealId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    MealDay.findByIdAndUpdate(mealId, req.body, { new: true })
      .then((updatedMeal) => res.json(updatedMeal))
      .catch((error) => res.json(error));

    });

    router.delete("/meals/:mealId", (req, res, next) => {
        const { mealId } = req.params;
      
        if (!mongoose.Types.ObjectId.isValid(mealId)) {
          res.status(400).json({ message: "Specified id is not valid" });
          return;
        }
      
        MealDay.findByIdAndRemove(mealId)
          .then(() =>
            res.json({
              message: `Meal with ${mealId} is removed successfully.`,
            })
          )
          .catch((error) => res.json(error));
      });

module.exports = router;