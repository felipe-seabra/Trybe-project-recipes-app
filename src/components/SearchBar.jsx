import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getMeal from '../services/mealApi';

function SearchBar({ searchInput, place }) {
  const [methodToSearch, setMethodToSearch] = useState('');
  const [meals, setMeals] = useState([]);

  const handleChange = ({ target: { value } }) => {
    setMethodToSearch(value);
  };

  const handleSearch = async () => {
    const fetchedMeals = await getMeal(methodToSearch, searchInput, place);
    setMeals(fetchedMeals);
  };
  console.log(meals);

  return (
    <section>
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="searchOption"
            onChange={ handleChange }
            value="Ingredient"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="searchOption"
            onChange={ handleChange }
            value="Name"
          />
          Name
        </label>

        <label htmlFor="First letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="First letter"
            name="searchOption"
            onChange={ handleChange }
            value="First Letter"
          />
          First letter
        </label>
      </div>

      <div>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleSearch }
        >
          Search
        </button>
      </div>
    </section>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
};

export default SearchBar;
