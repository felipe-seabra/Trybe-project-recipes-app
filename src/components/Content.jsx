import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meals from '../pages/Meals';
import Login from '../pages/Login';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipesPage from '../pages/DoneRecipesPage';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeInProgress from '../pages/RecipeInProgress';

export default class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/done-recipes" component={ DoneRecipesPage } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}
