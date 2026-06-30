import { View } from './View';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _data;
    _message;

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    // Generates all needed markup for list rendering
    _generateMarkup() {
        return this._data?.map(bookmarkedRecipe =>
            this.#generatePreviewMarkup(bookmarkedRecipe),
        );
    }

    // Generates markup per recipe found
    #generatePreviewMarkup(bookmarkedRecipe) {
        // Checks if result is active recipe
        const isActive = window.location.hash.slice(1) === bookmarkedRecipe.id;
        return `
        <li class="preview">
            <a class="preview__link ${isActive ? 'preview__link--active' : ''}" href="#${bookmarkedRecipe.id}">
                <figure class="preview__fig">
                    <img src="${bookmarkedRecipe.imageUrl}" alt="${bookmarkedRecipe.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${bookmarkedRecipe.title} ...</h4>
                    <p class="preview__publisher">${bookmarkedRecipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
    }
}

export default new BookmarksView();
