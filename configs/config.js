/**
 * Values from `backend/.env` (loaded first via `import './loadEnv.js'` in server.js).
 */

const toPort = (value) => {
  const n = parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
};

const toPositiveIntOr = (value, fallback) => {
  const n = parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

/** `PORT` in .env */
export const port = toPort(process.env.PORT) ?? 3000;

/** `DB_URL` in .env (falls back to `MONGODB_URI`, then local default) */
export const mongoUri =
  process.env.DB_URL ??
  process.env.MONGODB_URI ??
  'mongodb://localhost:27017/recipesDB';

export const aiRecipeModel =
  process.env.AI_RECIPE_MODEL ?? 'anthropic/claude-sonnet-4.5';

/** `AI_RECIPE_MAX_WORDS` in .env — cap for recipe text in the AI prompt (default 35). */
export const aiRecipeMaxWords = toPositiveIntOr(process.env.AI_RECIPE_MAX_WORDS, 35);
