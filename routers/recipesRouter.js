import express from 'express';
import * as recipesService from '../services/recipesService.js';

const router = express.Router();

// Base URL: 'http://localhost:3000/recipes'

// Get All Recipes
router.get('/', async (req, res) => {
  try {
    const queries = req.query
    const recipes = await recipesService.getAllRecipes(queries);
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get All Cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await recipesService.getAllCities();
    res.send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get By Id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a new recipe
router.post('/', async (req, res) => {
  try {
    const perObj = req.body;
    const newPer = await recipesService.addRecipe(perObj);
    res.send(`The new ID: ${newPer._id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a recipe
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await recipesService.updateRecipe(id, data);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesService.deleteRecipe(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
