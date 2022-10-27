import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import getMeal from '../services/mealApi';
import '../styles/components/searchBy.css';

function Recipes({ history }) {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const recipe = async () => {
      const awaitMeal = await getMeal('Name', '', history.location.pathname);
      const twelve = 12;
      const firstTwelve = awaitMeal.filter((_elem, index) => index < twelve);
      setMenu(firstTwelve);
      console.log(awaitMeal);
    };
    recipe();
  }, []);
  return (
    <div>
      <h1>Teste</h1>
      <ul>
        {
          menu.map((food) => {
            if (history.location.pathname === '/drinks') {
              const { strDrink, strDrinkThumb, idDrink } = food;
              return (
                <li
                  key={ idDrink }
                >
                  <img
                    src={ strDrinkThumb }
                    alt={ strDrink }
                    className="img"
                  />
                  <p>{strDrink}</p>
                </li>
              );
            }
            const { strMeal, strMealThumb, idMeal } = food;
            return (
              <li
                key={ idMeal }
              >
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  className="img"
                />
                <p>{strMeal}</p>
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
