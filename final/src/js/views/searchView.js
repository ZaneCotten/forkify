import { View } from './View.js';

class SearchView extends View {
    _parentElement = document.querySelector('.search');
    _btnSearch = document.querySelector('.search__btn');
    _fieldSearch = document.querySelector('.search__field');
    #searchCallback;
    _message;

    //////////////////////////////////////////////
    // PUBLIC METHODS
    //////////////////////////////////////////////

    // Publisher for search handler
    addHandlerSearch(handler) {
        this.#searchCallback = handler;

        this._parentElement.addEventListener('submit', this.#handleSearch);
    }

    //////////////////////////////////////////////
    // PROTECTED METHODS
    //////////////////////////////////////////////

    // Returns Markup using the current data (recipe)
    _clear() {
        this._fieldSearch.value = '';
    }

    //////////////////////////////////////////////
    // PRIVATE METHODS
    //////////////////////////////////////////////

    // Gets user input from search field
    get #query() {
        return this._fieldSearch.value.trim().toLowerCase();
    }

    #handleSearch = event => {
        event.preventDefault();

        // Ensures safe search query
        const safeSearchQuery = this._escapeHtml(this.#query);

        // If valid event occurs, execute callback function
        this.#searchCallback(safeSearchQuery);
    };
}

export default new SearchView();
