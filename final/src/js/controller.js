import 'core-js/stable';
import 'dotenv/config';
import 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg';
import { getRecipeHtml } from './recipeTemplates';

// const FORKIFY_API_KEY = process.env.FORKIFY_API_KEY;

const recipeContainer = document.querySelector('.recipe');

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

//////////////////////////////////////////////
// HELPER FUNCTIONS
//////////////////////////////////////////////

const formatRecipePropertyNamesToCamelCase = function (recipe) {
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
    title: recipe.title,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
  };
};

//////////////////////////////////////////////
// MAIN FUNCTIONS
//////////////////////////////////////////////

// GET RECIPE FROM API
const getRecipeById = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
    );

    const data = await response.json();

    // Throw error if fetch failed
    if (!response.ok)
      throw new Error(
        `\nFetch failed \nStatus: ${response.status} \nReason: ${data.message}`,
      );

    // Destructure recipe object from data
    const {
      data: { recipe },
    } = data;

    console.log(recipe);

    // Return retrieved and formatted recipe
    return formatRecipePropertyNamesToCamelCase(recipe);
  } catch (err) {
    console.error(`Something went wrong! ${err.message}`);
  }
};

const renderElement = (
  parentElement,
  elementHtml,
  insertPosition = 'afterbegin',
) => parentElement.insertAdjacentHTML(insertPosition, elementHtml);

const emptyElement = containerElement => (containerElement.innerHTML = '');

const renderRecipe = (html, parentElement = recipeContainer) => {
  emptyElement(recipeContainer);
  renderElement(recipeContainer, html);
};
// recipeContainer.insertAdjacentHTML('afterbegin', html);

const renderGreetingMessage = () => {
  const html = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
  `;
  emptyElement(recipeContainer);
  renderElement(recipeContainer, html);
};

const renderSpinner = parentElement => {
  const html = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  emptyElement(parentElement);
  renderElement(parentElement, html);
};

const recipeId = '664c8f193e7aa067e94e86af';

const getAndDisplayRecipe = async function (recipeId) {
  renderSpinner(recipeContainer);
  const currentRecipe = await getRecipeById(recipeId);

  renderRecipe(getRecipeHtml(currentRecipe));
};

getAndDisplayRecipe(recipeId);

//////////////////////////////////////////////
// MOCK API RESPONSE
//////////////////////////////////////////////

// const mockRecipe = {
//   data: {
//     recipe: {
//       cooking_time: 60,
//       id: '664c8f193e7aa067e94e86af',
//       image_url:
//         'http://forkify-api.herokuapp.com/images/4797377235_c07589b7d4_be953.jpg',
//       ingredients: [
//         ({ quantity: 1, unit: '', description: 'can large biscuits' },
//         { quantity: 1, unit: '', description: 'whole can refried beans' },
//         { quantity: 3, unit: 'tbsps', description: 'salsa or picante sauce' },
//         { quantity: 1.5, unit: 'cups', description: 'grated cheddar cheese' },
//         { quantity: null, unit: '', description: 'Pico de gallo' },
//         {
//           quantity: 2,
//           unit: 'cups',
//           description: 'browned hamburger meat seasoned',
//         },
//         { quantity: null, unit: '', description: 'Shredded iceberg lettuce' },
//         { quantity: 3, unit: 'tbsps', description: 'salsa' },
//         { quantity: 5, unit: 'tbsps', description: 'sour cream' },
//         { quantity: null, unit: '', description: 'Cilantro for garnish' }),
//       ],
//       publisher: 'The Pioneer Woman',
//       servings: 4,
//       source_url:
//         'http://thepioneerwoman.com/cooking/2010/07/16-minute-meal-4-mexican-flatbread-pizza/',
//       title: 'Mexican “Flatbread” Pizza',
//     },
//   },
// };
