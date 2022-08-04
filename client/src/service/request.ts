import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const request = axios.create();

request.defaults.baseURL = 'http://10.0.2.2:8000';

/* request.defaults.headers = {
  Authorization: accessToken,
} as CustomHeadersProperty; */

request.interceptors.request.use(async config => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  const tokenType = await EncryptedStorage.getItem('tokenType');
  config.headers = {
    Authorization: tokenType + ' ' + accessToken || '',
  };
  return config;
});

request.interceptors.response.use(
  async res => {
    if (res.data.access_token) {
      await EncryptedStorage.setItem('accessToken', res.data.access_token);
    }
    if (res.data.refresh_token) {
      await EncryptedStorage.setItem('refreshToken', res.data.refresh_token);
    }
    if (res.data.token_type) {
      await EncryptedStorage.setItem('tokenType', res.data.token_type);
    }

    return res;
  },
  async error => {
    const {status} = error.response;
    if (status === 405) {
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      const response = await axios.post(
        'http://10.0.2.2:8000/api/restoreToken',
        {refreshToken},
      );
      if (response.data.access_token) {
        const originRequest = error.config;
        await EncryptedStorage.setItem(
          'accessToken',
          response.data.access_token,
        );
        originRequest.headers.Authorization =
          'Bearer ' + response.data.access_token;
        return axios(originRequest);
      }
    }
  },
);

export default request;
