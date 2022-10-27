import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import getCategory from '../services/categoryApi';

function ButtonFilter({ history, handleGetCategories }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const { location: { pathname } } = history;
    const handleFilter = async () => {
      const categoryApi = await getCategory(pathname);
      return setFiltered(categoryApi);
    };
    handleFilter();
  }, [history]);

  return (
    <section>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          name="ALL"
          onClick={ handleGetCategories }
        >
          All
        </button>
        {filtered.map((name, index) => {
          const NUMBER_FIVE = 5;
          if (index < NUMBER_FIVE) {
            const { strCategory } = name;
            return (
              <button
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
                type="button"
                name={ strCategory }
                onClick={ handleGetCategories }
              >
                {strCategory}
              </button>
            );
          }
          return [];
        })}
      </div>
    </section>
  );
}

ButtonFilter.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  handleGetCategories: PropTypes.func.isRequired,
};

export default withRouter(ButtonFilter);
