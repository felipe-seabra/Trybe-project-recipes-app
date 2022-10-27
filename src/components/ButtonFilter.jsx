import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import getCategory from '../services/categoryApi';

function ButtonFilter({ history }) {
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
    <div>
      {filtered.map((name, index) => {
        const NUMBER_FIVE = 5;
        if (index < NUMBER_FIVE) {
          const { strCategory } = name;
          return (
            <button
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
            >
              {strCategory}
            </button>
          );
        }
        return [];
      })}
    </div>
  );
}

ButtonFilter.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(ButtonFilter);
