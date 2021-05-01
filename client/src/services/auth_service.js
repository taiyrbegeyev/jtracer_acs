import axios from 'axios';
import {
  getModeratorPending,
  getModeratorSuccess,
  getModeratorFail
} from 'reducers/moderator_slice';

const rootUrl = 'api/v1/';
const signInUrl = rootUrl + 'auth/login';
const signOutUrl = rootUrl + 'auth/logout';
const refreshAccessTokenUrl = rootUrl + 'auth/refreshToken';
const moderatorUrl = rootUrl + 'moderator';

export const signIn = async (data) => {
  const res = await axios.post(signInUrl, data);
  const accessTokenMaxAge = res.data.data;
  const accessTokenExpiry = new Date(new Date().getTime() + accessTokenMaxAge);
  localStorage.setItem('accessTokenExpiry', accessTokenExpiry);
};

export const signOut = async () => {
  localStorage.removeItem('accessTokenExpiry');
  return await axios.post(signOutUrl);
};

export const getModeratorProfile = () => async (dispatch) => {
  try {
    dispatch(getModeratorPending());
    const res = await axios.get(moderatorUrl, {
      // include the access token from a http-only cookie
      withCredentials: true
    });
    const moderator = res.data.data;

    if (moderator && moderator._id) {
      return dispatch(getModeratorSuccess(moderator));
    }
    dispatch(getModeratorFail('The moderator is not found'));
  } catch (err) {
    dispatch(getModeratorFail(err));
  }
};

export const refreshAcessToken = async () => {
  try {
    const res = await axios.post(refreshAccessTokenUrl, {
      withCredentials: true
    });
    const accessTokenMaxAge = res.data.data;
    const accessTokenExpiry = new Date(
      new Date().getTime() + accessTokenMaxAge
    );
    localStorage.setItem('accessTokenExpiry', accessTokenExpiry);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const isAccessTokenExpired = () => {
  const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');
  return (
    new Date(accessTokenExpiry).toISOString() <
    new Date(Date.now()).toISOString()
  );
};
