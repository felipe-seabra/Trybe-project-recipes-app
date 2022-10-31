import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const Mycontext = createContext();

function ContextProvider({ children }) {
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

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
