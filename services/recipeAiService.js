import { generateText } from 'ai';
import { aiRecipeModel, aiRecipeMaxWords } from '../configs/config.js';

function ingredientsToString(ingredients) {
  if (ingredients == null) return '';
  if (Array.isArray(ingredients)) {
    return ingredients.map((s) => String(s).trim()).filter(Boolean).join(', ');
  }
  return String(ingredients).trim();
}

function tryParseAiJson(text) {
  let s = text.trim();
  s = s
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const attempt = (raw) => {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  let parsed = attempt(s);
  if (parsed) return parsed;

  const start = s.indexOf('{');
  const end = s.lastIndexOf('}');
  if (start >= 0 && end > start) {
    parsed = attempt(s.slice(start, end + 1));
  }
  return parsed;
}

/**
 * Calls the AI gateway to produce recipe text + difficulty + cooking time as JSON.
 * Requires AI_GATEWAY_API_KEY (Vercel AI Gateway) unless using a direct provider.
 */
export async function generateRecipeFromAi({ title, ingredients }) {
  const ingredientsStr = ingredientsToString(ingredients);
  const model = aiRecipeModel;
  const prompt = `Write a short recipe for "${title}" using these ingredients: ${ingredientsStr}.

Rules:
1. The recipe text must not exceed ${aiRecipeMaxWords} words.
2. Return these keys only:
   - recipe: string, the cooking instructions (max ${aiRecipeMaxWords} words)
   - difficulty: exactly one of easy, medium, hard
   - cooking_time: number, minutes
   - short_due_to_cost: the string "yes" if you shortened or cut the recipe to stay within the word limit, otherwise the string "no"
3. Output one JSON object only. No markdown code fences, no prose before or after, no trailing commas, no comments.

Valid example:
{"recipe":"...","difficulty":"easy","cooking_time":25,"short_due_to_cost":"no"}`;

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

    const sdc = parsed.short_due_to_cost;
    const shortDueToCost =
      sdc === true ||
      (typeof sdc === 'string' && sdc.trim().toLowerCase() === 'yes');

    return {
      recipe: String(parsed.recipe ?? text).trim(),
      difficulty,
      cooking_time: cookingNum,
      short_due_to_cost: shortDueToCost ? 'yes' : 'no',
    };
  }

  return {
    recipe: text.trim(),
    difficulty: 'easy',
    cooking_time: 0,
    short_due_to_cost: 'no',
  };
}
