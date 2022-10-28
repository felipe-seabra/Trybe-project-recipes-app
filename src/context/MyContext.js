import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const Mycontext = createContext();

function Provider({ children }) {
  const [search, setSearch] = useState(false);
  const contextValue = useMemo(() => ({
    search,
    setSearch,
  }), [search]);

  return (
    <Mycontext.Provider value={ contextValue }>
      {children}
    </Mycontext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
