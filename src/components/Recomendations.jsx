import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/Recomendations.css';

function Recomendations({ history }) {
  const [recomendationData, setRecomendationData] = useState([]);
  const [load, setLoad] = useState(true);

  const { location: { pathname } } = history;
  const getRecomendationApi = async () => {
    if (pathname.includes('drinks')) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecomendationData(data);
    } else {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecomendationData(data);
    }
    setLoad(false);
  };

  useEffect(() => {
    getRecomendationApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(recomendationData);

  const NUMBER_SIX = 6;
  return (
    <div className="row">
      <div className="scrolling-wrapper">

        {
          !load && pathname.includes('meals')
        && recomendationData.drinks.map((element, index) => {
          if (index < NUMBER_SIX) {
            return (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
                // className="card col-6"
                className="card card-body me-3"
              >
                <img
                  className="img-fluid"
                  data-testid="recipe-photo"
                  src={ element.strDrinkThumb }
                  alt={ element.strDrink }
                />
                <p
                  data-testid={ `${index}-recommendation-title` }
                  className="text-center"
                >
                  {element.strDrink}
                </p>
              </div>
            );
          }
          return null;
        })
        }
        {
          !load && pathname.includes('drinks')
        && recomendationData.meals.map((element, index) => {
          if (index < NUMBER_SIX) {
            return (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
                // className="card col-6"
                className="card card-body me-3"
              >
                <img
                  className="img-fluid"
                  data-testid="recipe-photo"
                  src={ element.strMealThumb }
                  alt={ element.strMeal }
                />
                <p
                  data-testid={ `${index}-recommendation-title` }
                  className="text-center"
                >
                  {element.strMeal}
                </p>
              </div>
            );
          }
          return null;
        })
        }

      </div>
    </div>
  );
}

Recomendations.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(Recomendations);
