import { API_KEY, API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = { recipe: {}, search: {} };

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

export const loadSearchResults = async function (searchQuery) {
    try {
        const data = await getJSON(
            `${API_URL}?search=${searchQuery}&key=${API_KEY}`,
        );

        // Destructure recipes object from data
        const {
            data: { recipes: foundRecipes },
        } = data;

        // Check for any found recipes
        if (!foundRecipes)
            throw new Error(`No recipes found with search "${searchQuery}"`);

        // Update state
        state.search = foundRecipes;

        // Return search results
        return state.search;
    } catch (err) {
        throw err;
    }
};
