async function RecipeDetailsApi(recipeId, pathName) {
  const domain = (pathName === '/drinks' ? 'thecocktaildb' : 'themealdb');

  const ENDPOINT = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const response = await fetch(ENDPOINT);

  if (domain === 'thecocktaildb') {
    const { drinks } = await response.json();
    if (drinks === null) {
      return [];
    }
    return drinks;
  }
  const { meals } = await response.json();
  if (meals === null) {
    return [];
  }
  return meals;
}

export default RecipeDetailsApi;
