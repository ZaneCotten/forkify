import icons from 'url:../../img/icons.svg';
import { RESULTS_PER_PAGE } from '../config.js';
import { View } from './View.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    _data;
    #totalResults;
    #currentPage;
    #paginationCallback;

    // Publisher for pagination handler
    addHandlerPagination(handler) {
        this.#paginationCallback = handler;
        this._parentElement.addEventListener('click', this.#handlePagination);
    }

    render(page, results) {
        this.#currentPage = page;
        this.#totalResults = results.length;
        this._data = results;

        this._clear();
        const markup = this._generateMarkup();
        this._insertMarkup(markup);
    }

    _generateMarkup = () => {
        return `
        ${this.#generateLastPageButtonMarkup()}
        ${this.#generateNextPageButtonMarkup()}
        `;
    };

    #handlePagination = event => {
        event.preventDefault();
        const clickedElement = event.target.closest('.btn--inline');

        // Checks if pagination button has been clicked
        if (!clickedElement) return;

        // Checks which pagination button has been clicked
        clickedElement === document.querySelector('.pagination__btn--next')
            ? this.#currentPage++
            : this.#currentPage--;

        // Update pagination view
        this.render(this.#currentPage, this._data);

        // Update displayed page results
        this.#paginationCallback(this.#currentPage);
    };

    #generateLastPageButtonMarkup = () => {
        return this.#currentPage - 1 <= 0
            ? ``
            : `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.#currentPage - 1}</span>
        </button>
        `;
    };

    #generateNextPageButtonMarkup = () => {
        // Return nothing if the last results are currently displayed
        return this.#currentPage * RESULTS_PER_PAGE > this.#totalResults
            ? ``
            : `
        <button class="btn--inline pagination__btn--next">
            <span>Page ${this.#currentPage + 1}</span>
            <svg class="search__icon">
                <use
                    href="${icons}#icon-arrow-right"
                ></use>
            </svg>
        </button>
        `;
    };
}

export default new PaginationView();
