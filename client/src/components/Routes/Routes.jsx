import HomePage from 'pages/HomePage/HomePage';
import SignInPage from 'pages/SignInPage/SignInPage';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignInPage} exact />
        <ProtectedRoute
          path="/"
          redirectRoute="/signin"
          guardFunction={() => {
            return true;
          }}
          component={HomePage}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
