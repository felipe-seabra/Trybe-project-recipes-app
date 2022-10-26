async function getMeal(method, toSearch, location) {
  let methodToUse = null;
  const domain = (location === '/drinks' ? 'thecocktaildb' : 'themealdb');

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

  const ENDPOINT = `https://www.${domain}.com/api/json/v1/1/${methodToUse}=${toSearch}`;
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

export default getMeal;
