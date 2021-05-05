import axios from 'axios';
import moment from 'moment';

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
  return contacts.map(
    ({ checkInTime, checkOutTime, eventId, _id: id, ...rest }) => ({
      checkInTime: moment(checkInTime).local().format('YYYY-MM-DD HH:mm:ss'),
      checkOutTime: moment(checkOutTime).local().format('YYYY-MM-DD HH:mm:ss'),
      eventName: eventId.eventName,
      id,
      ...rest
    })
  );
};
