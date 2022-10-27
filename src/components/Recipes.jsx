import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import getMeal from '../services/mealApi';
import ButtonFilter from './ButtonFilter';
import '../styles/components/searchBy.css';

function Recipes({ history }) {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const recipe = async () => {
      const awaitMeal = await getMeal('Name', '', history.location.pathname);
      const twelve = 12;
      const firstTwelve = awaitMeal.filter((_elem, index) => index < twelve);
      setMenu(firstTwelve);
    };
    recipe();
  }, [history]);

  const handleGetCategories = async ({ target: { name } }) => {
    const { location: { pathname } } = history;
    const TWELVE = 12;
    try {
      const result = (name === 'ALL'
        ? await getMeal('Name', '', pathname)
        : await getMeal('Category', name, pathname));
      const firstTwelve = result.slice(0, TWELVE);
      setMenu(firstTwelve);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Teste</h1>
      <ButtonFilter
        handleGetCategories={ handleGetCategories }
      />
      <ul>
        {
          menu.map((food, index) => {
            if (history.location.pathname === '/drinks') {
              const { strDrink, strDrinkThumb, idDrink } = food;
              return (
                <li
                  data-testid={ `${index}-recipe-card` }
                  key={ idDrink }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt={ strDrink }
                    className="img"
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {strDrink}

                  </p>

                </li>
              );
            }
            const { strMeal, strMealThumb, idMeal } = food;
            return (
              <li
                data-testid={ `${index}-recipe-card` }
                key={ idMeal }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                  className="img"
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {strMeal}

                </p>
              </li>
            );
          })
        }

      </ul>
    </div>
  );
}
Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
export default withRouter(Recipes);
