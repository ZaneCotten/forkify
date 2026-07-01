import {
    API_KEY,
    API_URL,
    BOOKMARK_STORAGE_NAME,
    RESULTS_PER_PAGE,
} from './config.js';
import { AJAX } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: {},
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1,
    },
    bookmarks: [],
};

const createRecipeObject = function (data) {
    const { recipe } = data.data;

    return {
        id: recipe.id,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        imageUrl: recipe.image_url,
        title: recipe.title,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        servings: recipe.servings,
        ...(recipe.key && { key: recipe.key }),
    };
};

// Fetches recipe data using recipe id
export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}/${id}&key=${API_KEY}`);

        // Check if data is undefined
        if (!data) throw new Error(`Could not find recipe by id: ${id}`);

        // Update state
        state.recipe = createRecipeObject(data);

        // Ensure bookmarked recipes are still bookmarked after new API call
        if (state.bookmarks.some(rec => rec.id === state.recipe.id))
            state.recipe.bookmarked = true;

        // Return recipe
        return state.recipe;
    } catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

        // Destructure recipes object from data
        const {
            data: { recipes: foundRecipes },
        } = data;

        // Check for any found recipes
        if (
            !foundRecipes ||
            (Array.isArray(foundRecipes) && foundRecipes.length === 0)
        )
            throw new Error(`No recipes found with search "${query}"`);

        // Update state
        state.search.results = foundRecipes.map(recipe => {
            return {
                publisher: recipe.publisher,
                imageUrl: recipe.image_url,
                id: recipe.id,
                title: recipe.title,
            };
        });

        // Reset results page count
        state.search.page = 1;

        // Return search results
        return state.search.results;
    } catch (err) {
        throw err;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return Array.from(state.search.results).slice(start, end);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity =
            (ingredient.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    state.recipe.bookmarked = true;

    // Save bookmarks to local storage
    persistBookmarks();
};

export const removeBookmark = function (recipe) {
    state.bookmarks = state.bookmarks.filter(rec => rec.id !== recipe.id);

    state.recipe.bookmarked = false;

    // Save bookmarks to local storage
    persistBookmarks();
};

export const persistBookmarks = function () {
    const bookmarksJSON = JSON.stringify(state.bookmarks);
    localStorage.setItem(BOOKMARK_STORAGE_NAME, bookmarksJSON);
};

export const getPersistedBookmarks = function () {
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_STORAGE_NAME));
    if (!bookmarks) return;

    state.bookmarks = bookmarks;
};

const getRecipeData = function (recipe) {
    return Object.entries(recipe)
        .filter(entry => !entry.at(0).startsWith('ingredient'))
        .map(entry => {
            let value = entry.at(1);

            // If entry IS a finite number, return as number
            if (Number.isFinite(+value)) {
                value = +value;
                return value;
            }

            // Otherwise, return as string
            return value;
        });
};

const getIngredients = function (recipe) {
    try {
        return Object.entries(recipe)
            .filter(
                entry =>
                    entry.at(0).startsWith('ingredient') && entry.at(1) !== '',
            )
            .map(ing => {
                const ingArr = ing.at(1).replaceAll(' ', '').split(',');
                if (ingArr.length !== 3)
                    throw new Error(
                        'Wrong ingredient format! Please use correct format (quantity,unit,description)',
                    );
                const [quantity, unit, description] = ingArr;
                return {
                    quantity: quantity ? +quantity : null,
                    unit,
                    description,
                };
            });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = getIngredients(newRecipe);

        const [title, sourceUrl, imageUrl, publisher, cookingTime, servings] =
            getRecipeData(newRecipe);

        const recipe = {
            title,
            source_url: sourceUrl,
            image_url: imageUrl,
            publisher,
            cooking_time: cookingTime,
            servings,
            ingredients,
        };

        const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

        state.recipe = createRecipeObject(data);

        addBookmark(state.recipe);
    } catch (err) {
        console.error(err);
        throw err;
    }
};
