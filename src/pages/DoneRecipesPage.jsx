import React, { Component } from 'react';
import Header from '../components/Header';
import DoneRecipes from '../components/DoneRecipes';

class DoneRecipesPage extends Component {
  render() {
    return (
      <div>
        <Header title="Done Recipes" search={ false } />
        <DoneRecipes />
      </div>
    );
  }
}

export default DoneRecipesPage;
