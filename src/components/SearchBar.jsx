import React from 'react';

function SearchBar() {
  return (
    <section>
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="searchOption"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="searchOption"
          />
          Name
        </label>

        <label htmlFor="First letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="First letter"
            name="searchOption"
          />
          First letter
        </label>
      </div>

      <div>
        <button data-testid="exec-search-btn" type="button">Search</button>
      </div>
    </section>
  );
}

export default SearchBar;
