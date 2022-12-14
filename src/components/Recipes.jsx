import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import getMeal from '../services/mealApi';
import ButtonFilter from './ButtonFilter';
import '../styles/components/Recipes.css';

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

  const handleGetCategories = async ({ target }) => {
    const { name, checked } = target;
    const { location: { pathname } } = history;
    const TWELVE = 12;
    try {
      const result = (name === 'ALL' || checked === false
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
      <ButtonFilter
        handleGetCategories={ handleGetCategories }
      />
      <div className="recipes-div">

        <ul>
          {
            menu.map((food, index) => {
              if (history.location.pathname === '/drinks') {
                const { strDrink, strDrinkThumb, idDrink } = food;
                return (
                  <Link key={ idDrink } to={ `/drinks/${food.idDrink}` }>
                    <li
                      data-testid={ `${index}-recipe-card` }
                    >
                      <img
                        data-testid={ `${index}-card-img` }
                        src={ strDrinkThumb }
                        alt={ strDrink }
                        className="img"
                      />
                      <p
                        data-testid={ `${index}-card-name` }
                        className="mt-1"
                      >
                        {strDrink}
                      </p>
                    </li>
                  </Link>
                );
              }
              const { strMeal, strMealThumb, idMeal } = food;
              return (
                <Link key={ idMeal } to={ `/meals/${food.idMeal}` }>
                  <li
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ strMealThumb }
                      alt={ strMeal }
                      className="img"
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                      className="mt-1"
                    >
                      {strMeal}
                    </p>
                  </li>
                </Link>
              );
            })
          }

        </ul>

      </div>
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
