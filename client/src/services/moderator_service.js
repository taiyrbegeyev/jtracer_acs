import axios from 'axios';
import {
  getModeratorPending,
  getModeratorSuccess,
  getModeratorFail
} from 'reducers/moderator_slice';

const rootUrl = 'api/v1/';
const moderatorUrl = rootUrl + 'moderator';

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
