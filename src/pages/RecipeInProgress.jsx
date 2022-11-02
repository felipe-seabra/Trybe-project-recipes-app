import React, { useEffect, useState, useContext, useMemo } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsApi from '../services/RecipeDetailsApi';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import '../styles/pages/RecipeDetals.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { Mycontext } from '../context/MyContext';
import '../styles/pages/RecipeInProgress.css';

function RecipeInProgress({ history }) {
  const { location: { pathname } } = history;
  const { handleCopy, shareCopy,
    ingredientsAndMeasures, verifyPathname, parameters } = useContext(Mycontext);
  const keyToSearchFor = pathname.includes('meals') ? 'meals' : 'drinks';
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [defaultApi, setDefaultApi] = useState({});
  const INITIAL_STATE = useMemo(() => ({
    drinks: {},
    meals: {},
    [keyToSearchFor]: {
      [id]: [],
    },
  }), [id, keyToSearchFor]);
  const [inProgressRecipes, setInProgressRecipes] = useState(INITIAL_STATE);
  useEffect(() => {
    const handleFilter = async () => {
      const categoryApi = await RecipeDetailsApi(id, pathname);
      setDefaultApi(categoryApi[0]);
      verifyPathname(categoryApi);
    };
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favoriteRecipes !== null) {
      setFavorites(favoriteRecipes);
    }
    handleFilter();
  }, [history, id, pathname, verifyPathname]);
  const handleFavorite = () => {
    const {
      idDrink, idMeal, strArea, strCategory, strAlcoholic,
      strDrink, strMeal, strDrinkThumb, strMealThumb,
    } = defaultApi;

    const newFavorite = {
      id: idDrink || idMeal,
      type: pathname.includes('drink') ? 'drink' : 'meal',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink || strMeal,
      image: strDrinkThumb || strMealThumb,
    };

    const recipeIsFavorite = favorites
      .some((recipe) => Number(recipe.id) === Number(id));
    if (recipeIsFavorite) {
      const removedItem = favorites.filter((recipe) => (
        Number(recipe.id) !== Number(id)
      ));
      setLocalStorage('favoriteRecipes', removedItem);
      setFavorites(removedItem);
    } else {
      setLocalStorage('favoriteRecipes', [...favorites, newFavorite]);
      setFavorites([...favorites, newFavorite]);
    }
  };
  const { ingredients, measures } = ingredientsAndMeasures;
  const handleChecked = ({ target }) => {
    const { checked } = target;

    const ingredientAndMeasure = target.nextSibling.innerText;
    const prevCopy = inProgressRecipes[keyToSearchFor][id];

    if (checked) {
      target.parentElement.className = 'checked';
      const newList = [...prevCopy, ingredientAndMeasure];
      setInProgressRecipes({
        ...inProgressRecipes,
        [keyToSearchFor]: {
          [id]: newList,
        },
      });
    } else {
      target.parentElement.className = 'noChecked';
      const newList = inProgressRecipes[keyToSearchFor][id]
        .filter((element) => element !== ingredientAndMeasure);
      setInProgressRecipes({
        ...inProgressRecipes,
        [keyToSearchFor]: {
          [id]: newList,
        },
      });
    }
  };

  useEffect(() => {
    const localInProgress = getLocalStorage('inProgressRecipes') || INITIAL_STATE;
    setInProgressRecipes(localInProgress);
  }, [INITIAL_STATE]);

  useEffect(() => {
    setLocalStorage('inProgressRecipes', inProgressRecipes);
    const listOfChecked = inProgressRecipes[keyToSearchFor][id];
    const isItDone = listOfChecked.length === ingredients.length;
    setIsRecipeDone(isItDone);
  }, [id, inProgressRecipes, ingredients.length, keyToSearchFor]);

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
        <button type="button" onClick={ handleFavorite }>
          <img
            data-testid="favorite-btn"
            src={ favorites.some(((element) => Number(element.id) === Number(id)
            )) ? blackHeartIcon : whiteHeartIcon }
            alt="Botão favoritar"
          />
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
            ingredients.map((ingredient, index) => {
              const ingredientAndMeasure = `${ingredient} ${measures[index]}`;
              const shouldBeChecked = inProgressRecipes[keyToSearchFor][id]
                .includes(ingredientAndMeasure);
              return (
                <label
                  htmlFor={ index }
                  key={ index }
                  className={ `col-12 
                  ${shouldBeChecked ? 'checked' : 'noChecked'}` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    className="m-2"
                    onClick={ handleChecked }
                    defaultChecked={ shouldBeChecked }
                  />
                  <span>{ingredientAndMeasure}</span>
                </label>
              );
            })
          }
        </div>
      </div>
      <p data-testid="recipe-category">{parameters.category}</p>
      <p data-testid="instructions">{parameters.instruction}</p>
      <button
        type="button"
        className="btn fixed-bottom"
        data-testid="finish-recipe-btn"
        disabled={ !isRecipeDone }
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
