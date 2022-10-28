import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meals from '../pages/Meals';
import Login from '../pages/Login';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeDetails from '../pages/RecipeDetails';

export default class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/drinks/:id-da-receita/in-progress" />
        <Route path="/meals/:id-da-receita/in-progress" />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}
