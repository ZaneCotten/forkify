import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
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

const controlSearchResults = async function (query) {
    try {
        // 1. Check for empty search query
        if (!query)
            throw new Error('If you search for nothing, you will find nothing');

        // 2. Render spinner while fetching search results
        resultsView.renderSpinner();

        // 3. Load search results
        await model.loadSearchResults(query);

        // 4. Render found recipes
        resultsView.render(model.state.search);
    } catch (err) {
        // Log any errors to console
        console.error(`System Failure in controlSearchResults: \n${err}`);

        // Render error to user
        resultsView.renderError(err);
    }
};

const init = function () {
    // Subscribe to Publisher for render events
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};

init();
