import icons from 'url:../../img/icons.svg';
import { View } from './View';

class CustomRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully added :)';

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnCloseWindow = document.querySelector('.btn--close-modal');
    _btnContainer = document.querySelector('.nav__btn--add-recipe');
    // _submitButton = document.querySelector('.upload__btn');
    _allInputs = [];

    _submitCallback;

    render() {
        this._clear();
        const markup = this._generateMarkup();
        this._insertMarkup(markup);
    }

    addHandlerShowWindow = () => {
        this._btnContainer.addEventListener('click', this._showWindow);
    };

    addHandlerHideWindow = () => {
        this._overlay.addEventListener('click', this.toggleWindow);
        this._btnCloseWindow.addEventListener('click', this.toggleWindow);
    };

    addHandlerUpload = handler => {
        this._submitCallback = handler;
        this._window.addEventListener('submit', this._handleSubmit);
    };

    _showWindow = () => {
        this.render();
        this.toggleWindow();
    };

    toggleWindow = () => {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
        this._clearForm();
    };

    _handleSubmit = e => {
        e.preventDefault();
        const dataArr = [...new FormData(this._parentElement)];
        const data = Object.fromEntries(dataArr);
        this._submitCallback(data);
    };

    _clearForm() {
        // this._allInputs.forEach(input => (input.value = ''));
    }

    _generateMarkup() {
        return `
                <div class="upload__column">
                    <h3 class="upload__heading">Recipe data</h3>
                    <label>Title</label>
                    <input value="TEST" required name="title" type="text" />
                    <label>URL</label>
                    <input value="TEST" required name="sourceUrl" type="text" />
                    <label>Image URL</label>
                    <input value="TEST" required name="image" type="text" />
                    <label>Publisher</label>
                    <input value="TEST" required name="publisher" type="text" />
                    <label>Prep time</label>
                    <input
                        value="23"
                        required
                        name="cookingTime"
                        type="number"
                    />
                    <label>Servings</label>
                    <input value="23" required name="servings" type="number" />
                </div>

                <div class="upload__column">
                    <h3 class="upload__heading">Ingredients</h3>
                    <label>Ingredient 1</label>
                    <input
                        value="0.5,kg,Rice"
                        type="text"
                        required
                        name="ingredient-1"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 2</label>
                    <input
                        value="1,,Avocado"
                        type="text"
                        name="ingredient-2"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 3</label>
                    <input
                        value=",,salt"
                        type="text"
                        name="ingredient-3"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 4</label>
                    <input
                        type="text"
                        name="ingredient-4"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 5</label>
                    <input
                        type="text"
                        name="ingredient-5"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                    <label>Ingredient 6</label>
                    <input
                        type="text"
                        name="ingredient-6"
                        placeholder="Format: 'Quantity,Unit,Description'"
                    />
                </div>

                <button class="btn upload__btn">
                    <svg>
                        <use href="${icons}#icon-upload-cloud"></use>
                    </svg>
                    <span>Upload</span>
                </button>
            </form>
        `;
    }
}

export default new CustomRecipeView();
