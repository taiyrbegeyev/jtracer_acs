import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  redirectRoute,
  guardFunction,
  guardFunctionArgs,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (guardFunction && guardFunction(guardFunctionArgs)) {
          return <Component {...props} />;
        } else {
          return <Redirect to={redirectRoute} />;
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectRoute: PropTypes.string.isRequired,
  guardFunction: PropTypes.func.isRequired,
  guardFunctionArgs: PropTypes.object
};

export default ProtectedRoute;
