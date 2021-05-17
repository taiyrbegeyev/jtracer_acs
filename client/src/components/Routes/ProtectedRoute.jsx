import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAccessTokenExpired, refreshAcessToken } from 'services/auth_service';
import { signInSuccess } from 'reducers/auth_slice';
import { getModeratorProfile } from 'services/moderator_service';

const ProtectedRoute = ({ component: Component, redirectRoute, ...rest }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { isAuth } = useSelector((state) => state.auth);
  const { moderator } = useSelector((state) => state.moderator);

  useEffect(() => {
    const updateAccessToken = async () => {
      const result = await refreshAcessToken();
      result &&
        dispatch(signInSuccess()) &&
        console.log('Updating Access Token');
      setLoading(false);
    };

    if (isAuth) {
      setLoading(false);
    } else {
      if (
        localStorage.getItem('accessTokenExpiry') &&
        !isAccessTokenExpired()
      ) {
        dispatch(getModeratorProfile());
        updateAccessToken();
      } else {
        setLoading(false);
      }
    }
  }, [dispatch, isAuth, moderator._id]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <p>Loading ...</p>;
        } else {
          return isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect to={redirectRoute} />
          );
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
