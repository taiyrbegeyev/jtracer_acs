import HomePage from 'pages/HomePage/HomePage';
import PageNotFound from 'pages/PageNotFound/PageNotFound';
import SignInPage from 'pages/SignInPage/SignInPage';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignInPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <ProtectedRoute
          path="/"
          redirectRoute="/signin"
          component={HomePage}
          exact
        />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
