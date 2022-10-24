import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meals from '../pages/Meals';
import Login from '../pages/Login';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

export default class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/drinks/:id-da-receita/in-progress" />
        <Route path="/meals/:id-da-receita/in-progress" />
        <Route path="/drinks/:id-da-receita" />
        <Route path="/meals/:id-da-receita" />
        <Route path="/profile" component={ Profile } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals" component={ Meals } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}
