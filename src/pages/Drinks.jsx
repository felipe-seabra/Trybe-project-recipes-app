import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Recomendations from '../components/Recomendations';
import { Mycontext } from '../context/MyContext';

function Drinks() {
  const { search, setSearch } = useContext(Mycontext);
  useEffect(() => {
    setSearch(false);
  }, []);
  return (
    <div>
      <Header title="Drinks" />
      {!search
        && <Recipes />}
      <Recomendations />
      <Footer />
    </div>
  );
}

export default Drinks;
