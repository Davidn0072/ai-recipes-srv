import Recipe from '../models/recipeModel.js';

// Get All
const getAllRecipes = (queries) => {
  return Recipe.find(queries);
};

// Get By ID
const getRecipeById = (id) => {
  return Recipe.findById(id);
};

// Create
const addRecipe = (obj) => {
  // Option 1
  return Recipe.create(obj);
  // // Option 2
  // const per = new Recipe(obj);
  // return per.save();
};

// Update
const updateRecipe = (id, obj) => {
  return Recipe.findByIdAndUpdate(id, obj);
};

// Delete
const deleteRecipe = (id) => {
  return Recipe.findByIdAndDelete(id);
};

export { getAllRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe };
