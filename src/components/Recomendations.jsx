import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMeal from '../services/mealApi';

function Recomendations({ history }) {
  // const [response, setResponse] = useState([]);
  const [mealApi, setMealApi] = useState([]);
  // const [drinkApi, setDrinkApi] = useState([]);

  const { location: { pathname } } = history;
  useEffect(() => {
    const recipe = async () => {
      const awaitMeal = await getMeal('Name', '', pathname);
      setMealApi(awaitMeal);
    };
    recipe();
  }, [history, pathname]);

  console.log(mealApi);

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
