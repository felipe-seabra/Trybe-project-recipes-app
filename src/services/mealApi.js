async function getMeal(method, toSearch, place) {
  let methodToUse = null;
  const test = (place === 'Drinks' ? 'thecocktaildb' : 'themealdb');

  switch (method) {
  case 'Ingredient':
    methodToUse = 'filter.php?i';
    break;
  case 'Name':
    methodToUse = 'search.php?s';
    break;
  default:
    if (toSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      methodToUse = 'search.php?f';
    }
    break;
  }

  const ENDPOINT = `https://www.${test}.com/api/json/v1/1/${methodToUse}=${toSearch}`;
  const response = await fetch(ENDPOINT);
  const { meals } = await response.json();
  return meals;
}

export default getMeal;
