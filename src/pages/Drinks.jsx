import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Recomendations from '../components/Recomendations';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <Recipes />
      <Recomendations />
      <Footer />
    </div>
  );
}

export default Drinks;
