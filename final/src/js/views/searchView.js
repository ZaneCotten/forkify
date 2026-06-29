import { View } from './View.js';

class SearchView extends View {
    _parentElement = document.querySelector('.search');
    _btnSearch = document.querySelector('.search__btn');
    _fieldSearch = document.querySelector('.search__field');
    _searchCallback;
    _message;

    //////////////////////////////////////////////
    // PUBLIC METHODS
    //////////////////////////////////////////////

    // Publisher for search handler
    addHandlerSearch(handler) {
        this._searchCallback = handler;

        this._parentElement.addEventListener('submit', this.#handleSearch);
    }

    // Gets user input from search field
    get searchQuery() {
        return this._fieldSearch.value.trim().toLowerCase();
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

    #handleSearch = event => {
        event.preventDefault();

        // Ensures safe search query
        const safeSearchQuery = this._escapeHtml(this.searchQuery);

        // If valid event occurs, execute callback function
        this._searchCallback(safeSearchQuery);
    };
}

export default new SearchView();
