import React, { createContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

export const Mycontext = createContext();

function ContextProvider({ children }) {
  const [search, setSearch] = useState(false);
  const [shareCopy, setShareCopy] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [ingredientsAndMeasures, setIngredientsAndMeasure] = useState({
    ingredients: [],
    measures: [],
  });

  const handleCopy = () => {
    const url = window.location.href;
    if (url.includes('in-progress')) {
      const urlReplaced = url.replace('/in-progress', '');
      copy(urlReplaced);
    } else {
      copy(url);
    }

    setShareCopy('Link copied!');

    const THREE_SECONDS = 3000;
    setTimeout(() => {
      setShareCopy([]);
    }, THREE_SECONDS);
  };

  const separateIngredientsAndMeasures = (obj) => {
    const entries = Object.entries(obj);
    const extractIngredientsAndMeasure = entries.reduce((acc, element) => {
      const accCopy = { ...acc };
      const key = element[0];
      const value = element[1];
      if (key.includes('Ingredient') && value) {
        accCopy.ingredients.push(value);
      }
      if (key.includes('Measure') && (value !== ' ')) {
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
    const {
      strDrink, strDrinkThumb, idDrink, strCategory, strInstructions, strAlcoholic,
      strYoutube, idMeal, strMeal, strMealThumb,
    } = categoryApi[0];

    const data = {
      video: strYoutube,
      instruction: strInstructions,
      alcohol: strAlcoholic,
      category: strCategory,
      picture: strDrinkThumb || strMealThumb,
      title: strDrink || strMeal,
      id: idDrink || idMeal,
    };

    setParameters(data);
  }, []);

  const contextValue = useMemo(() => ({
    search,
    shareCopy,
    handleCopy,
    setSearch,
    verifyPathname,
    parameters,
    ingredientsAndMeasures,
  }), [search, shareCopy, parameters, verifyPathname, ingredientsAndMeasures]);

  return (
    <Mycontext.Provider value={ contextValue }>
      {children}
    </Mycontext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
