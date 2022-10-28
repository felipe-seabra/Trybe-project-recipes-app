import React, { useEffect, useState, useCallback } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsApi from '../services/RecipeDetailsApi';
import Recomendations from '../components/Recomendations';
import searchIcon from '../images/searchIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails({ history }) {
  const { location: { pathname } } = history;
  const { id } = useParams();
  const [parameters, setParameters] = useState([]);
  const [ingredientsAndMeasures, setIngredientsAndMeasure] = useState({
    ingredients: [],
    measures: [],
  });

  const separateIngredientsAndMeasures = (obj) => {
    console.log(obj);
    const entries = Object.entries(obj);
    const extractIngredientsAndMeasure = entries.reduce((acc, element) => {
      const accCopy = { ...acc };
      const key = element[0];
      const value = element[1];
      if (key.includes('Ingredient') && value) {
        accCopy.ingredients.push(value);
      }
      if (key.includes('Measure') && (value !== ' ' || value)) {
        accCopy.measures.push(value);
      }
      return accCopy;
    }, {
      ingredients: [],
      measures: [],
    });
    setIngredientsAndMeasure(extractIngredientsAndMeasure);
  };

  const verifyPathname = useCallback((categoryApi) => {
    separateIngredientsAndMeasures(categoryApi[0]);
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

  const { ingredients, measures } = ingredientsAndMeasures;
  return (
    <div className="container justify-content-center">
      <section>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ searchIcon } alt="Botão compartilhar" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ shareIcon } alt="Botão favoritar" />
        </button>
      </section>
      <img
        className="img-fluid"
        data-testid="recipe-photo"
        src={ parameters.picture }
        alt={ parameters.title }
      />
      <h1 data-testid="recipe-title">{parameters.title}</h1>
      {
        (pathname === `/drinks/${parameters.id}`)
        && <p data-testid="recipe-category">{parameters.alcohol}</p>
      }
      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${ingredient} ${measures[index]}`}
              </li>
            ))
          }
        </ul>
      </div>
      <p data-testid="recipe-category">{parameters.category}</p>
      <p data-testid="instructions">{parameters.instruction}</p>
      {
        (pathname === `/meals/${parameters.id}`)
        && (
          <div className="ratio ratio-16x9 mb-3">
            <iframe
              data-testid="video"
              title="youtube video"
              src={ parameters.video.replace('watch?v=', 'embed/') }
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )
      }
      <Recomendations />
      <Link to={ `${parameters.id}/in-progress` }>
        <button
          type="button"
          className="btn fixed-bottom"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </Link>
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
