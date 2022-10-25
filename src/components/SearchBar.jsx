import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import getMeal from '../services/mealApi';
import '../styles/components/searchBy.css';

function SearchBar({ searchInput, place, history }) {
  const [methodToSearch, setMethodToSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setMethodToSearch(value);
  };

  const handleSearch = async () => {
    const fetchedMeals = await getMeal(methodToSearch, searchInput, place);
    const TWELVE = 12;
    if (fetchedMeals.length === 1) {
      setShouldRedirect(true);
      setMeals(fetchedMeals);
    } else if (fetchedMeals.length > TWELVE) {
      const firstTwelve = fetchedMeals.filter((_elem, index) => index < TWELVE);
      setMeals(firstTwelve);
    } else {
      setMeals(fetchedMeals);
    }
  };

  if (shouldRedirect) {
    if (place === 'Drinks') {
      const { idDrink } = meals[0];
      return (
        <Redirect
          to={ `/${place.toLowerCase()}/${idDrink}` }
        />
      );
    }
    const { idMeal } = meals[0];
    return (
      <Redirect
        to={ `/${place.toLowerCase()}/${idMeal}` }
      />
    );
  }

  return (
    <section>
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="searchOption"
            onChange={ handleChange }
            value="Ingredient"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="searchOption"
            onChange={ handleChange }
            value="Name"
          />
          Name
        </label>

        <label htmlFor="First letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="First letter"
            name="searchOption"
            onChange={ handleChange }
            value="First Letter"
          />
          First letter
        </label>
      </div>

      <div>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleSearch }
        >
          Search
        </button>
      </div>
      <ul>
        {
          meals.map((food, index) => {
            const { location: { pathname } } = history;
            if (pathname === '/drinks') {
              const { strDrink, strDrinkThumb, idDrink } = food;
              return (
                <li
                  key={ idDrink }
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    src={ strDrinkThumb }
                    alt={ strDrink }
                    data-testid={ `${index}-card-img` }
                    className="img"
                  />
                  <h1 data-testid={ `${index}-card-name` }>{strDrink}</h1>

                </li>
              );
            }
            const { strMeal, strMealThumb, idMeal } = food;
            return (
              <li
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="img"
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <h1 data-testid={ `${index}-card-name` }>{strMeal}</h1>

              </li>
            );
          })
        }
      </ul>
    </section>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(SearchBar);
