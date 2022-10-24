import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meals from '../pages/Meals';
import Login from '../pages/Login';

export default class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
      </Switch>
    );
  }
}
