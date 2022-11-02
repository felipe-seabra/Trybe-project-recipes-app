import React, { useEffect, useState, useContext } from 'react';
import { getLocalStorage } from '../services/localStorage';
import { Mycontext } from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipesSaved, setDoneRecipesSaved] = useState([]);
  const { handleCopy, shareCopy } = useContext(Mycontext);

  useEffect(() => {
    const getDoneRecipes = () => {
      const getRecipes = getLocalStorage('doneRecipes') || [];
      setDoneRecipesSaved(getRecipes);
    };
    getDoneRecipes();
  }, []);

  return (
    <div>
      <section>
        <button data-testid="filter-by-all-btn" className="btn" type="button">All</button>
        <button
          data-testid="filter-by-meal-btn"
          className="btn"
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          className="btn"
          type="button"
        >
          Drinks
        </button>
      </section>

      <section>
        {doneRecipesSaved.map((doneRecipes, index) => {
          const { id, image, category, name, doneDate, tags, type } = doneRecipes;
          return (
            <div key={ id } className="container">
              <img
                className="img-fluid"
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
              <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
              {tags.map((tag, i) => (
                <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
              ))}
              <button
                type="button"
                onClick={ () => handleCopy(id, type) }
                data-testid={ `${index}-horizontal-share-btn` }
              >
                <img src={ shareIcon } alt="Botão compartilhar" />
              </button>
              <p>{shareCopy}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default DoneRecipes;
