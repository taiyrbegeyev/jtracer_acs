import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getModeratorProfile,
  isAccessTokenExpired,
  refreshAcessToken
} from 'services/auth_service';
import { signInSuccess } from 'reducers/auth_slice';

const ProtectedRoute = ({ component: Component, redirectRoute, ...rest }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { isAuth } = useSelector((state) => state.auth);
  const { moderator } = useSelector((state) => state.moderator);

  useEffect(() => {
    const updateAccessToken = async () => {
      const result = await refreshAcessToken();
      console.log('Updating Access Token');
      console.log(result);
      result && dispatch(signInSuccess());
      setLoading(false);
    };

    !isAuth &&
      !moderator._id &&
      localStorage.getItem('accessTokenExpiry') &&
      !isAccessTokenExpired() &&
      dispatch(getModeratorProfile()) &&
      console.log('1');

    !isAuth &&
      localStorage.getItem('accessTokenExpiry') &&
      !isAccessTokenExpired() &&
      updateAccessToken() &&
      console.log('2');
  }, [dispatch, isAuth, moderator._id]);

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(`isAuth: ${isAuth}`);
        console.log(`loading: ${loading}`);
        if (!loading && !isAuth) {
          return <Redirect to={redirectRoute} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectRoute: PropTypes.string.isRequired,
  guardFunction: PropTypes.func,
  guardFunctionArgs: PropTypes.object
};

export default ProtectedRoute;
