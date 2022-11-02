import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

export const Mycontext = createContext();

function ContextProvider({ children }) {
  const [search, setSearch] = useState(false);
  const [shareCopy, setShareCopy] = useState([]);

  const handleCopy = (id, type) => {
    const url = window.location.href;
    if (url.includes('in-progress')) {
      const urlReplaced = url.replace('/in-progress', '');
      copy(urlReplaced);
    } else if (url.includes('done-recipes')) {
      const done = `${window.location.origin}/${type}s/${id}`;
      copy(done);
    } else {
      copy(url);
    }

    setShareCopy('Link copied!');

    const THREE_SECONDS = 3000;
    setTimeout(() => {
      setShareCopy([]);
    }, THREE_SECONDS);
  };

  const contextValue = useMemo(() => ({
    search,
    shareCopy,
    handleCopy,
    setSearch,
  }), [search, shareCopy]);

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
