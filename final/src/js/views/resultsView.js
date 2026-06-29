import { RESULTS_PER_PAGE } from '../config.js';
import { View } from './View.js';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _data;
    _currentFirstResult = 0;
    _currentLastResult = this._currentFirstResult + RESULTS_PER_PAGE;
    _message;

    //////////////////////////////////////////////
    // PROTECTED METHODS
    //////////////////////////////////////////////

    // Generates all needed markup for list rendering
    _generateMarkup() {
        return this._data
            .filter((result, i) =>
                i >= this._currentFirstResult && i < this._currentLastResult
                    ? result
                    : null,
            )
            .reduce(
                (str, recipe) => str + this.#generatePreviewMarkup(recipe),
                '',
            );
    }

    //////////////////////////////////////////////
    // PRIVATE METHODS
    //////////////////////////////////////////////

    // Generates markup per recipe found
    #generatePreviewMarkup(result) {
        return `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.imageUrl}" alt="${result.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title} ...</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                </div>
            </a>
        </li>
        `;
    }
}

export default new ResultsView();
