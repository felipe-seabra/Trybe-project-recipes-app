import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  const [search, setSearch] = useState(false);

  const handleSearch = useMemo(() => ({
    setSearch,
  }), [setSearch]);

  return (
    <div>
      <Header title="Meals" />
      {!search
        && <Recipes />}
      <Footer />
    </div>
  );
}

export default Meals;
