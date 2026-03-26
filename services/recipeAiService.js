import { generateText } from 'ai';

const DEFAULT_MODEL = 'anthropic/claude-sonnet-4.5';

function ingredientsToString(ingredients) {
  if (ingredients == null) return '';
  if (Array.isArray(ingredients)) {
    return ingredients.map((s) => String(s).trim()).filter(Boolean).join(', ');
  }
  return String(ingredients).trim();
}

function tryParseAiJson(text) {
  const trimmed = text.trim();
  const unfenced = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try {
    return JSON.parse(unfenced);
  } catch {
    return null;
  }
}

/**
 * Calls the AI gateway to produce recipe text + difficulty + cooking time as JSON.
 * Requires AI_GATEWAY_API_KEY (Vercel AI Gateway) unless using a direct provider.
 */
export async function generateRecipeFromAi({ title, ingredients }) {
  const ingredientsStr = ingredientsToString(ingredients);
  const model = process.env.AI_RECIPE_MODEL || DEFAULT_MODEL;

  const prompt = `Write a short recipe for "${title}" using these ingredients: ${ingredientsStr}.
Include in the response:
- Recipe (max 20 words)
- Difficulty level (easy, medium, hard)
- Cooking time (in minutes)
Format as JSON:
{
  "recipe": "...",
  "difficulty": "...",
  "cooking_time": "..."
}`;

  const { text } = await generateText({
    model,
    prompt,
  });

  const parsed = tryParseAiJson(text);
  if (parsed && typeof parsed === 'object') {
    const cookingRaw = parsed.cooking_time;
    const cookingNum =
      typeof cookingRaw === 'number' && Number.isFinite(cookingRaw)
        ? cookingRaw
        : parseInt(String(cookingRaw ?? '0'), 10) || 0;
    const diff = String(parsed.difficulty ?? 'easy').toLowerCase();
    const difficulty = ['easy', 'medium', 'hard'].includes(diff) ? diff : 'easy';

    return {
      recipe: String(parsed.recipe ?? text).trim(),
      difficulty,
      cooking_time: cookingNum,
    };
  }

  return {
    recipe: text.trim(),
    difficulty: 'easy',
    cooking_time: 0,
  };
}
