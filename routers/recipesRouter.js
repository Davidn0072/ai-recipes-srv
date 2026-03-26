import express from 'express';
import * as recipesService from '../services/recipesService.js';
import { generateRecipeFromAi } from '../services/recipeAiService.js';

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

// AI: generate recipe instructions (must be before GET /:id is not affected; POST is distinct)
router.post('/generate', async (req, res) => {
  try {
    const { title, ingredients } = req.body;
    if (title == null || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'title is required' });
    }
    const result = await generateRecipeFromAi({
      title: title.trim(),
      ingredients,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
