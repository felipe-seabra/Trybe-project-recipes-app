import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsApi from '../services/RecipeDetailsApi';

function RecipeDetails({ history }) {
  useEffect(() => {
    const handleFilter = async () => {
      const { location: { pathname } } = history;
      const categoryApi = await RecipeDetailsApi('52977', pathname);
      console.log(categoryApi);
    };
    handleFilter();
  }, []);

  return (
    <div>test</div>
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
