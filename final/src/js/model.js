export const state = {
  recipe: {},
};

// Fetches recipe data using recipe id
export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
    );

    // Parse data to JSON
    const data = await response.json();

    // Check fetch status
    if (!response.ok)
      throw new Error(
        `Could not load recipe: \nFetch failed \nStatus: ${response.status} \nReason: ${data.message}\n`,
      );

    // Destructure recipe object from data
    const {
      data: { recipe },
    } = data;

    // Check if recipe object is undefined
    if (!recipe) throw new Error(`Could not find recipe by id: ${id}`);

    // Update state
    state.recipe = {
      id: recipe.id,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
    };

    // Return recipe
    return state.recipe;
  } catch (err) {
    throw err;
  }
};
