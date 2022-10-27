import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import ButtonFilter from '../components/ButtonFilter';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <ButtonFilter />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
