import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import getMeal from '../services/mealApi';
import '../styles/components/searchBy.css';
import { actSetDrinks, actSetMeals } from '../redux/actions';

function SearchBar({ searchInput, history, dispatch }) {
  const [methodToSearch, setMethodToSearch] = useState('');
  const [menu, setMenu] = useState([]);

  const handleChange = ({ target: { value } }) => {
    setMethodToSearch(value);
  };

  const handleSearch = async () => {
    const { location: { pathname }, push } = history;
    const fetchedMenu = await getMeal(methodToSearch, searchInput, pathname);
    if (pathname === '/drinks') {
      dispatch(actSetDrinks(fetchedMenu));
    } else {
      dispatch(actSetMeals(fetchedMenu));
    }
    const TWELVE = 12;
    if (fetchedMenu.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (fetchedMenu.length === 1) {
      let fetchedMenuId = null;
      switch (pathname) {
      case '/drinks':
        fetchedMenuId = fetchedMenu[0].idDrink;
        break;
      default:
        fetchedMenuId = fetchedMenu[0].idMeal;
        break;
      }
      push(`${pathname}/${fetchedMenuId}`);
    } else if (fetchedMenu.length > TWELVE) {
      const firstTwelve = fetchedMenu.filter((_elem, index) => index < TWELVE);
      setMenu(firstTwelve);
    } else {
      setMenu(fetchedMenu);
    }
  };

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
          menu.map((food, index) => {
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
                  <p data-testid={ `${index}-card-name` }>{strDrink}</p>

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
                <p data-testid={ `${index}-card-name` }>{strMeal}</p>

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
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(withRouter(SearchBar));
