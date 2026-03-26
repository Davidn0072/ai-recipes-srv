import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
    {
        title: String,
        ingredients: [String],
        instructions: String,
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'easy'
        },
        cooking_time: {
            type: Number,
            default: 0
        }
    },
    { versionKey: false }
);

const Recipe = mongoose.model('recipe', recipeSchema, 'recipes');

export default Recipe;