import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import getMeal from '../services/mealApi';

function Recomendations({ history }) {
  const [recomendationData, setRecomendationData] = useState([]);
  // const [mealApi, setMealApi] = useState([]);
  // const [drinkApi, setDrinkApi] = useState([]);

  const { location: { pathname } } = history;
  const getRecomendationApi = async () => {
    if (pathname === '/drinks') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecomendationData(data);
    } else {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecomendationData(data);
    }
  };

  console.log(recomendationData);

  useEffect(() => {
    getRecomendationApi();
  }, []);

  return (
    <div>alo</div>
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
