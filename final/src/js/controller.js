import 'core-js/stable';
import 'dotenv/config';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';

// const FORKIFY_API_KEY = process.env.FORKIFY_API_KEY;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

if (module.hot) {
  module.hot.accept();
  console.log('Hot module updated!');
}

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

// GET RECIPE FROM API
const recipeId = '664c8f193e7aa067e94e86af';

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
