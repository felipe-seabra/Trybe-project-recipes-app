import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import ButtonFilter from '../components/ButtonFilter';

class Meals extends Component {
  render() {
    return (
      <div>
        <Header title="Meals" />
        <ButtonFilter />
        <Recipes />
        <Footer />
      </div>
    );
  }
}

export default Meals;
