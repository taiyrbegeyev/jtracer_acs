import axios from 'axios';

const rootUrl = 'api/v1/';
const signInUrl = rootUrl + 'auth/login';

export const signIn = async (data) => {
  return await axios.post(signInUrl, data);
};
