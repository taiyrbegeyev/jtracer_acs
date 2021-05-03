import axios from 'axios';
import {
  getEventsFail,
  getEventsPending,
  getEventsSuccess
} from 'reducers/event_slice';

const rootUrl = 'api/v1/';
const eventsUrl = rootUrl + 'events';

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch(getEventsPending());
    const res = await axios.get(eventsUrl, {
      // include the access token from a http-only cookie
      withCredentials: true
    });
    const { data } = res.data;
    const newData = await Promise.all(
      data.map(async (event) => {
        event['currentCheckIns'] = await getCurrentCheckIns(event._id);
        return event;
      })
    );
    dispatch(getEventsSuccess(newData));
  } catch (err) {
    dispatch(getEventsFail(err));
  }
};

export const createEvent = async (data) => {
  return await axios.post(eventsUrl, data, {
    // include the access token from a http-only cookie
    withCredentials: true
  });
};

export const removeEvent = async (eventId) => {
  return await axios.delete(eventsUrl + `/${eventId}`);
};

export const getCurrentCheckIns = async (eventId) => {
  const res = await axios.get(eventsUrl + `/${eventId}/checkIns`, {
    // include the access token from a http-only cookie
    withCredentials: true
  });
  const { data } = res.data;
  return data;
};
