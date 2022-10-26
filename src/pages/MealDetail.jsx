import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function MealDetail({ meals }) {
  const [meal, setFood] = useState([]);
  useEffect(() => {
    setFood([...meals]);
  }, [meals]);

  return (
    <div>
      <h1>MealDetail</h1>
      {
        meal.map((elem, index) => {
          const { strMeal, strMealThumb, idMeal } = elem;
          return (
            <li
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
                className="img"
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>

            </li>
          );
        })

      }
    </div>

  );
}

function mapStateToProps(state) {
  return {
    meals: state.menu.meals,
  };
}

MealDetail.propTypes = {
  meals: PropTypes.arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(MealDetail);
