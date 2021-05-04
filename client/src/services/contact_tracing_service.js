import axios from 'axios';

const rootUrl = 'api/v1/';
const getCheckInsUrl = rootUrl + 'checkIns';
const contactTracingUrl = rootUrl + 'checkIns/trace';

export const contactTrace = async (data) => {
  return await axios.get(contactTracingUrl, {
    params: data,
    // include the access token from a http-only cookie
    withCredentials: true
  });
};

export const getCheckIns = async (data) => {
  return await axios.get(getCheckInsUrl, {
    params: data,
    // include the access token from a http-only cookie
    withCredentials: true
  });
};

export const formatContactTrace = (contacts = []) => {
  // _id => id
  return contacts.map(({ eventId, _id: id, ...rest }) => ({
    eventName: eventId.eventName,
    id,
    ...rest
  }));
};
