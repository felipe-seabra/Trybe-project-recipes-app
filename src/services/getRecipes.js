async function getRecipe(local) {
//   const recipeView = [];
  const tipoDeComida = (local === 'Drinks' ? 'thecocktaildb' : 'themealdb');

  const ENDPOINT = `https://www.${tipoDeComida}.com/api/json/v1/1/search.php?s=`;
  const response = await fetch(ENDPOINT);
  const data = await response.json;
  console.log(data);
  return recipe;
}
export default getRecipe;
