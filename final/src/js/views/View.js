import icons from 'url:../../img/icons.svg';

export class View {
    _parentElement;
    _data;
    _errorMessage = 'Something went wrong :(';
    _message = 'This is the default message!';

    //////////////////////////////////////////////
    // PUBLIC METHODS
    //////////////////////////////////////////////

    render(data) {
        this._data = data;

        this._clear();
        const markup = this._generateMarkup();
        this._insertMarkup(markup);
    }

    update(data) {
        this._data = data;

        const newMarkup = this._generateMarkup();

        // Create virtual DOM
        const newDOM = document
            .createRange()
            .createContextualFragment(newMarkup);

        // Convert string to array of elements
        const newElements = Array.from(newDOM.querySelectorAll('*'));

        // Get all current elements in parent container
        const curElements = Array.from(
            this._parentElement.querySelectorAll('*'),
        );

        // For each element in parent container
        newElements.forEach((newEl, i) => {
            // Guard Clause, if elements are equal or does not have text content, return
            if (
                newEl.isEqualNode(curElements.at(i)) ||
                !newEl.firstChild?.nodeValue.trim()
            )
                return;

            // Update text content of elements that are different
            curElements.at(i).textContent = newEl.textContent;
        });
    }

    // Displays spinner
    renderSpinner() {
        this._clear();
        const markup = this._generateSpinnerMarkup();
        this._insertMarkup(markup);
    }

    // Displays error message to user
    renderError(err) {
        this._clear();
        const markup = this._generateErrorMarkup(err);
        this._insertMarkup(markup);
    }

    // Displays message to user
    renderMessage(message) {
        this._clear();
        const markup = this._generateMessageMarkup(message);
        this._insertMarkup(markup);
    }

    //////////////////////////////////////////////
    // PROTECTED METHODS
    //////////////////////////////////////////////

    // Clears inner HTML of parent class
    _clear() {
        this._parentElement.innerHTML = '';
    }

    _generateMarkup() {
        return ``;
    }

    // Inserts markup into parent element at insert position
    _insertMarkup(markup, insertPosition = 'afterbegin') {
        this._parentElement.insertAdjacentHTML(insertPosition, markup);
    }

    _generateSpinnerMarkup() {
        return `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
    }

    _generateErrorMarkup(error, errorMessage) {
        const safeErrorMessage = this._escapeHtml(error?.message ?? '');

        return `
            <div style="text-align: center; margin: 5rem;">
                <h1>${this._errorMessage}</h1>
                <p>${safeErrorMessage}</p>
            </div>
        `;
    }

    _generateMessageMarkup(message = this._message) {
        return `
    <div class="message">
        <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>
            ${message}
        </p>
    </div>
    `;
    }

    // Sanitizes input
    _escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}
