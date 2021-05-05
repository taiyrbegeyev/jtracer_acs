import axios from 'axios';

const rootUrl = 'api/v1/auth';
const signInUrl = rootUrl + '/login';
const signUpUrl = rootUrl + '/register';
const verifyEmailTokenUrl = rootUrl + '/verify/emailToken';
const signOutUrl = rootUrl + '/logout';
const refreshAccessTokenUrl = rootUrl + '/refreshToken';

export const signIn = async (data) => {
  const res = await axios.post(signInUrl, data);
  const accessTokenMaxAge = res.data.data;
  const accessTokenExpiry = new Date(new Date().getTime() + accessTokenMaxAge);
  localStorage.setItem('accessTokenExpiry', accessTokenExpiry);
};

export const signUp = async (data) => {
  return await axios.post(signUpUrl, data);
};

export const verifyEmailToken = async (data) => {
  try {
    await axios.get(verifyEmailTokenUrl, {
      params: data
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const signOut = async () => {
  localStorage.removeItem('accessTokenExpiry');
  return await axios.post(signOutUrl);
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
  return new Date(accessTokenExpiry) < new Date(Date.now());
};
