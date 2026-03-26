import * as recipesRepo from '../repositories/recipesRepo.js';

// Get All Recipes
const getAllRecipes = (queries) => {
  return recipesRepo.getAllRecipes(queries);
};

const getRecipeById = (id) => {
  return recipesRepo.getRecipeById(id);
};

const addRecipe = (newPer) => {
  return recipesRepo.addRecipe(newPer);
};

const updateRecipe = (id, data) => {
  return recipesRepo.updateRecipe(id, data);
};

const deleteRecipe = (id) => {
  return recipesRepo.deleteRecipe(id);
};

export {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
