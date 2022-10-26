import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function DrinkDetail({ drinks }) {
  const [drink, setFood] = useState([]);
  useEffect(() => {
    setFood([...drinks]);
  }, [drinks]);

  return (
    <div>
      <h1>DrinkDetail</h1>
      {
        drink.map((elem, index) => {
          const { strDrink, strDrinkThumb, idDrink } = elem;
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
        })

      }
    </div>

  );
}

function mapStateToProps(state) {
  return {
    drinks: state.menu.drinks,
  };
}

DrinkDetail.propTypes = {
  drinks: PropTypes.arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(DrinkDetail);
