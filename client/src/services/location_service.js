import axios from 'axios';
import {
  getLocationsFail,
  getLocationsPending,
  getLocationsSuccess
} from 'reducers/location_slice';

const rootUrl = 'api/v1/';
const getAllLocationsUrl = rootUrl + 'locations';

export const getAllLocations = () => async (dispatch) => {
  try {
    dispatch(getLocationsPending());
    const res = await axios.get(getAllLocationsUrl, {
      // include the access token from a http-only cookie
      withCredentials: true
    });
    const { data } = res.data;
    dispatch(getLocationsSuccess(data));
  } catch (err) {
    dispatch(getLocationsFail(err));
  }
};
