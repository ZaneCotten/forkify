import * as model from './model.js';
import recipeView from './views/recipeView.js';

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
    console.log(data);

    // Render recipe to screen
    recipeView.render(data);
  } catch (err) {
    // Log any errors to console
    console.error(`System Failure in controlRecipes: \n${err}`);

    // Render error message to user
    recipeView.renderError(err);
  }
};

const init = function () {
  // Subscribe to Publisher for render events
  recipeView.addHandlerRender(controlRecipes);
};

init();
