import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
};

// Fetches recipe data using recipe id
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // Destructure recipe object from data
    const {
      data: { recipe },
    } = data;

    // Check if recipe object is undefined
    if (!recipe) throw new Error(`Could not find recipe by id: ${id}`);

    // Update state
    state.recipe = {
      id: recipe.id,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
    };

    // Return recipe
    return state.recipe;
  } catch (err) {
    throw err;
  }
};
