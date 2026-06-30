import { API_KEY, API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: {},
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1,
    },
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

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);

        // Destructure recipes object from data
        const {
            data: { recipes: foundRecipes },
        } = data;

        // Check for any found recipes
        if (
            !foundRecipes ||
            (Array.isArray(foundRecipes) && foundRecipes.length === 0)
        )
            throw new Error(`No recipes found with search "${query}"`);

        // Update state
        state.search.results = foundRecipes.map(recipe => {
            return {
                publisher: recipe.publisher,
                imageUrl: recipe.image_url,
                id: recipe.id,
                title: recipe.title,
            };
        });

        // Return search results
        return state.search.results;
    } catch (err) {
        throw err;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
};
