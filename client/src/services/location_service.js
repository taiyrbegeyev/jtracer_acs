import axios from 'axios';
import {
  getLocationsFail,
  getLocationsPending,
  getLocationsSuccess
} from 'reducers/location_slice';

const rootUrl = 'api/v1/';
const locationsUrl = rootUrl + 'locations';

export const getAllLocations = () => async (dispatch) => {
  try {
    dispatch(getLocationsPending());
    const res = await axios.get(locationsUrl, {
      // include the access token from a http-only cookie
      withCredentials: true
    });
    const { data } = res.data;
    dispatch(getLocationsSuccess(data));
  } catch (err) {
    dispatch(getLocationsFail(err));
  }
};

export const createLocation = async (data) => {
  return await axios.post(locationsUrl, data, {
    // include the access token from a http-only cookie
    withCredentials: true
  });
};
