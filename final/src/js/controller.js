import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

if (module.hot) {
    module.hot.accept();
    console.log('Hot module updated!');
}

const controlRecipes = async function () {
    try {
        // Gets recipe ID from address bar
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

        // 4. Render Pagination Buttons
        paginationView.render(
            model.state.search.page,
            model.state.search.results,
        );

        // 5. Render found recipes
        resultsView.render(model.getSearchResultsPage(model.state.search.page));
    } catch (err) {
        // Log any errors to console
        console.error(`System Failure in controlSearchResults: \n${err}`);

        // Render error to user
        resultsView.renderError(err);
    }
};

const controlResultPagination = function (page) {
    // 1. Update state
    model.state.search.page = page;

    // 2. Render page's recipes
    resultsView.render(model.getSearchResultsPage(model.state.search.page));
};

const init = function () {
    // Subscribe to Publisher for render events
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerPagination(controlResultPagination);
};

init();
