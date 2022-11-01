/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import RecipeDetailsApi from '../services/RecipeDetailsApi';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import '../styles/pages/RecipeDetals.css';
import searchIcon from '../images/searchIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/pages/RecipeInProgress.css';

function RecipeInProgress({ history }) {
  const { location: { pathname } } = history;
  const { id } = useParams();
  const [parameters, setParameters] = useState([]);
  const [shareCopy, setShareCopy] = useState([]);
  const [ingredientsAndMeasures, setIngredientsAndMeasure] = useState({
    ingredients: [],
    measures: [],
  });

  const separateIngredientsAndMeasures = (obj) => {
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
    if (pathname.includes('drinks')) {
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

  const handleCopy = () => {
    const url = window.location.href;
    copy(url);
    setShareCopy('Link copied!');

    const THREE_SECONDS = 3000;
    setTimeout(() => {
      setShareCopy([]);
    }, THREE_SECONDS);
  };
  const { ingredients, measures } = ingredientsAndMeasures;

  const handleChecked = ({ target }) => {
    const { checked } = target;
    if (checked) {
      target.parentElement.className = 'checked';
    } else {
      target.parentElement.className = 'noChecked';
    }
    const { htmlFor } = target.parentElement;
    // console.log(htmlFor);

    const getKey = getLocalStorage('inProgressRecipes');
    if (getKey !== null) {
      setLocalStorage('inProgressRecipes', [...getKey,
        { id, ingredients: { [htmlFor]: checked } }]);
    } else {
      setLocalStorage('inProgressRecipes', [
        { id, ingredients: { [htmlFor]: checked } }]);
    }
  };

  return (
    <div className="container justify-content-center">
      <section>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleCopy }
        >
          <img src={ shareIcon } alt="Botão compartilhar" />
        </button>
        <p>{shareCopy}</p>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ searchIcon } alt="Botão favoritar" />
        </button>
      </section>
      <img
        className="image-food"
        data-testid="recipe-photo"
        src={ parameters.picture }
        alt={ parameters.title }
      />
      <h1 data-testid="recipe-title">{parameters.title}</h1>
      {
        (pathname === `/drinks/${parameters.id}/in-progress`)
        && <p data-testid="recipe-category">{parameters.alcohol}</p>
      }
      <div>
        <h2>Ingredients</h2>
        <div className="d-flex row">
          {
            ingredients.map((ingredient, index) => (
              <label
                htmlFor={ index }
                key={ index }
                className="col-12"
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  className="m-2"
                  onClick={ handleChecked }
                />
                {`${ingredient} ${measures[index]}`}
              </label>

            ))
          }
        </div>
      </div>
      <p data-testid="recipe-category">{parameters.category}</p>
      <p data-testid="instructions">{parameters.instruction}</p>
      <button
        type="button"
        className="btn fixed-bottom"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>

    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(RecipeInProgress);
