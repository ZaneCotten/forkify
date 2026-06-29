import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

if (module.hot) {
    module.hot.accept();
    console.log('Hot module updated!');
}

const controlRecipes = async function () {
    try {
        const id = recipeView.getHash();

        // Guard Clause for empty hash
        if (!id) return;

        // Show spinner while fetching recipe
        recipeView.renderSpinner();

        // Get recipe data
        const data = await model.loadRecipe(id);

        // Render recipe to screen
        recipeView.render(data);
    } catch (err) {
        // Log any errors to console
        console.error(`System Failure in controlRecipes: \n${err}`);

        // Render error message to user
        recipeView.renderError(err);
    }
};

const controlSearch = async function (searchQuery) {
    try {
        // Check for empty search query
        if (!searchQuery) return;

        const data = await model.loadSearchResults(searchQuery);

        // If any recipes returned, will return true
        const anyFoundRecipes = data.at(0) !== undefined;

        // If no recipes found, throw error
        if (!anyFoundRecipes)
            throw new Error(
                `No recipes found with search query "${searchQuery}"`,
            );

        console.log('Found recipes: ', data);
    } catch (err) {
        // Log any errors to console
        console.error(`System Failure in controlSearches: \n${err}`);

        // Render error message to user
        recipeView.renderError(err);
    }
};

controlRecipeList = function () {};

const init = function () {
    // Subscribe to Publisher for render events
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearch);
};

init();
