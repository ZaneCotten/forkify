import icons from 'url:../../img/icons.svg';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;

  //////////////////////////////////////////////
  // PUBLIC METHODS
  //////////////////////////////////////////////

  // Displays current recipe
  render(data) {
    this.#data = data;

    this.#clear();
    const markup = this.#generateMarkup();
    this.#insertMarkup(markup);
  }

  // Displays spinner
  spinner() {
    this.#clear();
    const markup = this.#generateSpinnerMarkup();
    this.#insertMarkup(markup);
  }

  // Gets hash from address bar (the currently selected recipe ID)
  getHash() {
    return window.location.hash.slice(1);
  }

  // Displays error message to user
  error(err) {
    this.#clear;
    const markup = this.#generateErrorMarkup(err);
    this.#insertMarkup(markup);
  }

  //////////////////////////////////////////////
  // PRIVATE METHODS
  //////////////////////////////////////////////

  // Clears inner HTML of parent class
  #clear() {
    this.#parentElement.innerHTML = '';
  }

  // Inserts markup into parent element at insert position
  #insertMarkup(markup, insertPosition = 'afterbegin') {
    this.#parentElement.insertAdjacentHTML(insertPosition, markup);
  }

  // Returns Markup using the current data (recipe)
  #generateMarkup() {
    return `
      <figure class="recipe__fig">
      <img src="${this.#data.imageUrl}" alt="${this.#data.title}" class="recipe__img" />
      <h1 class="recipe__title">
      <span>${this.#data.title}</span>
      </h1>
      </figure>
      
      <div class="recipe__details">
      <div class="recipe__info">
      <svg class="recipe__info-icon">
      <use href="${icons}.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
      <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
      <svg class="recipe__info-icon">
      <use href="${icons}.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
      <span class="recipe__info-text">servings</span>
      
      <div class="recipe__info-buttons">
      <button class="btn--tiny btn--increase-servings">
      <svg>
      <use href="${icons}.svg#icon-minus-circle"></use>
      </svg>
      </button>
      <button class="btn--tiny btn--increase-servings">
      <svg>
      <use href="${icons}.svg#icon-plus-circle"></use>
      </svg>
      </button>
      </div>
      </div>
      
      <div class="recipe__user-generated">
      <svg>
      <use href="${icons}.svg#icon-user"></use>
      </svg>
      </div>
      <button class="btn--round">
      <svg class="">
      <use href="${icons}.svg#icon-bookmark-fill"></use>
      </svg>
      </button>
      </div>
      
      <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this.#data.ingredients.map(ingredient => this.#generateIngredientMarkup(ingredient)).join('')}
      </ul>
      </div>
      
      <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${this.#data.publisher}</span>.
      Please check out directions at their website.
      </p>
      <a 
      class="btn--small recipe__btn"
      href="${this.#data.sourceUrl}"
      target="_blank"
      >
      <span>Directions</span>
      <svg class="search__icon">
      <use href="${icons}.svg#icon-arrow-right"></use>
      </svg>
      </a>
      </div>
      `;
  }

  // Returns Markup for the ingredient received
  #generateIngredientMarkup(ingredient) {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}.svg#icon-check"></use>
          </svg>
          ${this.#generateIngredientQuantityMarkup(ingredient.quantity)}
          <div class="recipe__description">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.description}
          </div>
        </li>
      `;
  }

  // Returns Markup for ingredient quantity received
  // If quantity is undefined, returns empty string
  #generateIngredientQuantityMarkup(quantity) {
    return quantity ? `<div class="recipe__quantity">${quantity}</div>` : '';
  }

  #generateSpinnerMarkup() {
    return `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  }

  #generateErrorMarkup(error) {
    return `
      <div style="text-align: center; margin: 5rem;">
        <h1>Recipe not found :(</h1>
        <p>${error.message}</p>
      </div>
    `;
  }
}

export default new RecipeView();
