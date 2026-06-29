import { View } from './View';

class SearchView extends View {
    _parentElement = document.querySelector('.search');
    _btnSearch = document.querySelector('.search__btn');
    _fieldSearch = document.querySelector('.search__field');
    _searchCallback;
    _data;
    _message;

    //////////////////////////////////////////////
    // PUBLIC METHODS
    //////////////////////////////////////////////

    // Gets hash from address bar (the currently selected recipe ID)
    getHash() {
        return window.location.hash.slice(1);
    }

    // Publisher for search callbacks
    addHandlerSearch(callback) {
        this._searchCallback = callback;

        ['click', 'keydown'].forEach(eventType =>
            this._parentElement.addEventListener(eventType, this.#handleSearch),
        );
    }

    renderError(err) {
        this._clear();
        const markup = this._generateErrorMarkup(err);
        this._insertMarkup(markup);
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
        // Guard Clause
        if (!this.#isValidEvent(event)) return;

        // Ensures safe search query
        const safeSearchQuery = this._escapeHtml(this.searchQuery);

        // If valid event occurs, execute callback function
        this._searchCallback(safeSearchQuery);
    };

    #isValidEvent(event) {
        // Tries to find search button on click
        const clickedElement = event.target.closest('.search__btn');

        // If either are true, return true
        return event.key === 'Enter' || clickedElement === this._btnSearch;
    }
}

export default new SearchView();
