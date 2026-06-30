import { View } from './View';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _data;
    _message;

    //////////////////////////////////////////////
    // PROTECTED METHODS
    //////////////////////////////////////////////

    // Generates all needed markup for list rendering
    _generateMarkup() {
        return this._data.map(result => this.#generatePreviewMarkup(result));
    }

    //////////////////////////////////////////////
    // PRIVATE METHODS
    //////////////////////////////////////////////

    // Generates markup per recipe found
    #generatePreviewMarkup(result) {
        // Checks if result is active recipe
        const isActive = window.location.hash.slice(1) === result.id;

        return `
        <li class="preview">
            <a class="preview__link ${isActive ? 'preview__link--active' : ''}" href="#${result.id}">
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
