import axios from 'axios';
import {
  getModeratorPending,
  getModeratorSuccess,
  getModeratorFail
} from 'reducers/moderator_slice';

const rootUrl = 'api/v1/';
const signInUrl = rootUrl + 'auth/login';
const moderatorUrl = rootUrl + 'moderators';

export const signIn = async (data) => {
  return await axios.post(signInUrl, data);
};

export const fetchModerator = async (email) => {
  return await axios.get(moderatorUrl, {
    params: { email },
    // include the access token from a http-only cookie
    withCredentials: true
  });
};

export const getModeratorProfile = (email) => async (dispatch) => {
  try {
    dispatch(getModeratorPending());
    const result = await fetchModerator(email);
    const moderator = result.data.data[0];

    console.log(moderator);
    if (moderator && moderator._id) {
      return dispatch(getModeratorSuccess(moderator));
    }
    dispatch(getModeratorFail('The moderator is not found'));
  } catch (err) {
    dispatch(getModeratorFail(err));
  }
};
