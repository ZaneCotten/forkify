import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import bookmarksView from './views/bookmarksView.js';
import customRecipeView from './views/customRecipeView.js';
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
        // 1. Get recipe ID from address bar
        const id = recipeView.getHash();

        // 2. Guard Clause for empty hash
        if (!id) return;

        // 3. Show spinner while fetching recipe
        recipeView.renderSpinner();

        // 4. Update search results
        resultsView.update(model.getSearchResultsPage());

        // 5. Update bookmark data
        bookmarksView.render(model.state.bookmarks);

        // 6. Get recipe data
        await model.loadRecipe(id);

        // 7. Render recipe to screen
        recipeView.render(model.state.recipe);
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

    // 2. Render search results
    resultsView.render(model.getSearchResultsPage(model.state.search.page));
};

const controlServings = function (newServings) {
    try {
        model.updateServings(newServings);

        recipeView.update(model.state.recipe);
    } catch (err) {
        // Log any errors to console
        console.error(`System Failure in controlServings: \n${err}`);

        // Render error to user
        recipeView.renderError(err);
    }
};

const controlAddBookmark = function (recipe) {
    try {
        // 1. Update state
        model.addBookmark(recipe);

        // 2. Update view
        recipeView.update(model.state.recipe);

        // 3. Update bookmarks list
        bookmarksView.render(model.state.bookmarks);
    } catch (err) {
        // Log any errors to console
        console.error(`System Failure in controlAddBookmark: \n${err}`);

        // Render error to user
        recipeView.renderError(err);
    }
};

const controlRemoveBookmark = function (recipe) {
    try {
        // 1. Update state
        model.removeBookmark(recipe);

        // 2. Update view
        recipeView.update(model.state.recipe);

        // 3. Update bookmarks list
        bookmarksView.render(model.state.bookmarks);
    } catch (err) {
        // Log any errors to console
        console.error(`System Failure in controlRemoveBookmark: \n${err}`);

        // Render error to user
        recipe.renderError(err);
    }
};

const controlBookmarkResults = function () {
    // 1. Get bookmarks from localstorage
    model.getPersistedBookmarks();

    // 2. Render bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controlAddCustomRecipe = async function (newRecipe) {
    try {
        customRecipeView.renderSpinner();

        // 1. Upload new recipe data
        await model.uploadRecipe(newRecipe);

        // 2. Render recipe
        recipeView.render(model.state.recipe);

        // 3. Success message
        customRecipeView.renderMessage();

        // Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        // 4. Close form window
        setTimeout(customRecipeView.toggleWindow, MODAL_CLOSE_SEC * 1000);
    } catch (err) {
        console.error(err);
        customRecipeView.renderError(err);
    }
};

const init = function () {
    // Subscribe to Publisher for render events
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerBookmarks(controlAddBookmark);
    recipeView.addHandlerBookmarks(controlRemoveBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerPagination(controlResultPagination);
    bookmarksView.addHandlerRender(controlBookmarkResults);

    customRecipeView.addHandlerShowWindow();
    customRecipeView.addHandlerHideWindow();
    customRecipeView.addHandlerUpload(controlAddCustomRecipe);
};

init();
