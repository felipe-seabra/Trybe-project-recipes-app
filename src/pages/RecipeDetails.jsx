import React, { useEffect, useState, useCallback } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsApi from '../services/RecipeDetailsApi';

function RecipeDetails({ history }) {
  const { location: { pathname } } = history;
  const { id } = useParams();
  const [parameters, setParameters] = useState([]);

  const verifyPathname = useCallback((categoryApi) => {
    if (pathname === `/drinks/${id}`) {
      const {
        strDrink,
        strDrinkThumb,
        idDrink, strCategory,
        strInstructions,
        strAlcoholic,
      } = categoryApi[0];

      const data = {
        instruction: strInstructions,
        alcohol: strAlcoholic,
        category: strCategory,
        picture: strDrinkThumb,
        title: strDrink,
        id: idDrink,
      };
      setParameters(data);
    } else {
      const { strMeal, strMealThumb, idMeal, strCategory, strInstructions, strYoutube,
      } = categoryApi[0];
      const data = {
        video: strYoutube,
        instruction: strInstructions,
        category: strCategory,
        picture: strMealThumb,
        title: strMeal,
        id: idMeal,
      };
      setParameters(data);
    }
  }, [id, pathname]);

  useEffect(() => {
    const handleFilter = async () => {
      const categoryApi = await RecipeDetailsApi(id, pathname);
      verifyPathname(categoryApi);
    };
    handleFilter();
  }, [history, id, pathname, verifyPathname]);

  return (
    <div className="container">
      <img
        data-testid="recipe-photo"
        src={ parameters.picture }
        alt={ parameters.title }
      />
      <h1 data-testid="recipe-title">{parameters.title}</h1>
      {
        (pathname === `/drinks/${parameters.id}`)
        && <p>{parameters.alcohol}</p>
      }
      <p data-testid="recipe-category">{parameters.category}</p>
      <p data-testid="instructions">{parameters.instruction}</p>
      {
        (pathname === `/meals/${parameters.id}`)
        && <iframe
          data-testid="video"
          title="youtube video"
          src={ parameters.video.replace('watch?v=', 'embed/') }
          frameBorder="0"
          allowFullScreen
          width="100%"
        />
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(RecipeDetails);
