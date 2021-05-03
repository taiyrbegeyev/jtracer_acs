import axios from 'axios';
import {
  getModeratorsFail,
  getModeratorsPending,
  getModeratorsSuccess
} from 'reducers/moderator_management_slice';
import { RoleToString } from 'constants/index';

const rootUrl = 'api/v1/';
const moderatorsUrl = rootUrl + 'moderators';

export const getModerators = () => async (dispatch) => {
  try {
    dispatch(getModeratorsPending());
    const res = await axios.get(moderatorsUrl, {
      // include the access token from a http-only cookie
      withCredentials: true
    });
    const moderators = res.data.data;
    return dispatch(getModeratorsSuccess(moderators));
  } catch (err) {
    dispatch(getModeratorsFail(err));
  }
};

export const createModerator = async (data) => {
  return await axios.post(moderatorsUrl, data, {
    // include the access token from a http-only cookie
    withCredentials: true
  });
};

export const removeModerator = async (moderatorId) => {
  return await axios.delete(moderatorsUrl + `/${moderatorId}`);
};

export const formatModerator = (moderators) => {
  // _id => id, and convert roles enums to strings
  return moderators.map(({ roles, _id: id, ...rest }) => ({
    roles: roles.map((role) => RoleToString[role]),
    id,
    ...rest
  }));
};
