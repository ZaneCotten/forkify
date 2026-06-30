import toFraction from 'fracty';
import icons from 'url:../../img/icons.svg';
import { View } from './View.js';

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    _servingsCallback;
    _bookmarkCallbacks = [];
    _data;
    _message;

    //////////////////////////////////////////////
    // PUBLIC METHODS
    //////////////////////////////////////////////

    // Gets hash from address bar (the currently selected recipe ID)
    getHash() {
        return window.location.hash.slice(1);
    }

    // Publisher for render handlers
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(event =>
            window.addEventListener(event, handler),
        );
    }

    addHandlerUpdateServings(handler) {
        this._servingsCallback = handler;
        this._parentElement.addEventListener(
            'click',
            this.#handleUpdateServingsChecks,
        );
    }

    addHandlerBookmarks(handler) {
        this._bookmarkCallbacks.push(handler);
        this._parentElement.addEventListener(
            'click',
            this.#handleBookMarkChecks,
        );
    }

    #handleBookMarkChecks = event => {
        const btn = event.target.closest('.btn--bookmark');

        if (!btn) return;

        const bookmarkCallback =
            this._data?.bookmarked === true
                ? this._bookmarkCallbacks.at(1)
                : this._bookmarkCallbacks.at(0);

        console.log(this._data);
        bookmarkCallback(this._data);
    };

    //////////////////////////////////////////////
    // PROTECTED METHODS
    //////////////////////////////////////////////

    // Returns Markup using the current data (recipe)
    _generateMarkup() {
        return `
        <figure class="recipe__fig">
            <img src="${this._data.imageUrl}" alt="${this._data.title}" class="recipe__img" />
                <h1 class="recipe__title">
                    <span>${this._data.title}</span>
                </h1>
        </figure>
        
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}.svg#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}.svg#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>
                
                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--decrease-servings">
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
                
            </div>
            <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${icons}.svg#icon-bookmark${this._data.bookmarked === true ? '-fill' : ''}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${this._data.ingredients.map(ingredient => this.#generateIngredientMarkup(ingredient)).join('')}
                </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this._data.publisher}</span>.
                Please check out directions at their website.
            </p>
            <a 
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
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

    //////////////////////////////////////////////
    // PRIVATE METHODS
    //////////////////////////////////////////////

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
        return quantity
            ? `<div class="recipe__quantity">${toFraction(quantity)}</div>`
            : '';
    }

    #handleUpdateServingsChecks = e => {
        const clickedElement = e.target.closest('.btn--tiny');

        // Check for servings button press
        if (!clickedElement) return;

        // Calculates new serving amount
        const newServingsAmount =
            clickedElement === document.querySelector('.btn--increase-servings')
                ? this._data.servings + 1
                : this._data.servings - 1;

        // If new amount would be 0, cancel/return
        if (newServingsAmount === 0) return;

        // Update
        this._servingsCallback(newServingsAmount);
    };
}

export default new RecipeView();
