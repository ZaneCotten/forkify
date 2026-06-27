const joinStrings = (...strings) => strings.join(' ');

const getStartOfIngredientsContainerHtml = function () {
  return `
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
  `;
};

const getEndOfIngredientsContainerHtml = function () {
  return `
    </ul>
  </div>
  `;
};

const getIngredientQuantityHtml = ingredient =>
  ingredient.quantity
    ? `<div class="recipe__quantity">${ingredient.quantity}</div>`
    : '';

const getIngredientHtml = function (ingredient) {
  const quantityHtml = getIngredientQuantityHtml(ingredient);

  return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
        ${quantityHtml}
        <div class="recipe__description">
          <span class="recipe__unit">${ingredient.unit}</span>
          ${ingredient.description}
        </div>
      </li>
    `;
};

const getAllIngredientsHtml = function (ingredients) {
  const startOfContainerHtml = getStartOfIngredientsContainerHtml();

  const endOfContainerHtml = getEndOfIngredientsContainerHtml();

  const ingredientsHtml = ingredients.reduce(
    (str, ingredient, i, arr) =>
      joinStrings(str, getIngredientHtml(ingredient)),
    '',
  );

  return joinStrings(startOfContainerHtml, ingredientsHtml, endOfContainerHtml);
};

const getStartOfRecipeHtml = function (recipe) {
  return `
  <figure class="recipe__fig">
    <img src="${recipe.imageUrl}" alt="${`NOT SURE WHAT TO PUT HERE`}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>
  
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>
  
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
  
    <div class="recipe__user-generated">
      <svg>
        <use href="src/img/icons.svg#icon-user"></use>
      </svg>
    </div>
      <button class="btn--round">
        <svg class="">
          <use href="src/img/icons.svg#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>
  
  `;
};

const getEndOfRecipeHtml = function (recipe) {
  return `
  
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}</span>.
        Please check out directions at their website.
      </p>
      <a 
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div> 
    `;
};

export const getRecipeHtml = function (recipe) {
  let html = joinStrings(
    getStartOfRecipeHtml(recipe),
    getAllIngredientsHtml(recipe.ingredients),
    getEndOfRecipeHtml(recipe),
  );

  return html;
};
