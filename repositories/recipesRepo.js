import Recipe from '../models/recipeModel.js';
import connectToDatabase from '../configs/db.js';

// Get All
const getAllRecipes = async (queries) => {
  await connectToDatabase();
  return Recipe.find(queries);
};

// Get By ID
const getRecipeById = async (id) => {
  await connectToDatabase();
  return Recipe.findById(id);
};

// Create
const addRecipe = async (obj) => {
  // Option 1
  await connectToDatabase();
  return Recipe.create(obj);
  // // Option 2
  // const per = new Recipe(obj);
  // return per.save();
};

// Update
const updateRecipe = async (id, obj) => {
  await connectToDatabase();
  return Recipe.findByIdAndUpdate(id, obj);
};

// Delete
const deleteRecipe = async (id) => {
  await connectToDatabase();
  return Recipe.findByIdAndDelete(id);
};

export { getAllRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe };
