import * as model from './model';
import recipeView from './views/recipeView';

if (module.hot) {
  module.hot.accept();
  console.log('Hot module updated!');
}

const displayRecipe = async function () {
  try {
    const id = recipeView.getHash();

    // Guard Clause for empty hash
    if (!id) return;

    // Show spinner
    recipeView.spinner();

    // Get recipe data
    const data = await model.loadRecipe(id);
    console.log(data);

    // Render recipe to screen
    recipeView.render(data);
  } catch (err) {
    // Log any errors to console
    console.error(`System Failure in displayRecipe: \n${err}`);

    // Render error message to user
    recipeView.error(err);
  }
};

const init = function () {
  ['hashchange', 'load'].forEach(event =>
    window.addEventListener(event, displayRecipe),
  );
};

init();

displayRecipe();
